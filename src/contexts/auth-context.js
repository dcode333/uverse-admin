import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";
import { useRefresh } from 'src/api/auth/useRefresh';



const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  authToken: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const payload = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        payload?.authToken
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user: payload?.user,
            authToken: payload?.authToken
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const { user, authToken } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      authToken
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      authToken: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutateAsync } = useRefresh();


  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;
    let isAuthenticated = false;
    let authToken = '';

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') ? true : false;
      authToken = window.sessionStorage.getItem('authenticated');
    } catch (err) {
      console.error(err);
    }


    if (isAuthenticated) {
      try {
        const response = await mutateAsync({
          token: authToken,
          userId: jwtDecode(authToken).user_id
        });

        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: {
            user: response,
            authToken
          }
        });

      } catch (err) {
        console.log(err);
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }

    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Mohamed Umair',
      email: 'uvrse@demo.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (userInfo) => {
    const { Token: authToken, user } = userInfo;

    // if (!user?.is_superuser && !user?.is_staff) {
    //   throw new Error('You are not allowed to Login');
    // }

    try {
      window.sessionStorage.setItem('authenticated', authToken);
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: {
        user,
        authToken
      }
    });
  };

  const signUp = async (userInfo) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    try {
      window.sessionStorage.removeItem('authenticated');
    } catch (err) {
      console.error(err);
    }
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
