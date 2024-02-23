import * as Yup from 'yup';

const yesterday = new Date(Date.now() - 86400000);
const uploadcheckinschema = Yup.object({
    description: Yup
        .string()
        .max(255)
        .required('Description is required'),
    title: Yup
        .string()
        .max(255)
        .required('Title is required'),
    longitude: Yup
        .number()
        .required('Longitude is required')
        .min(1, "Minimum value should 1"),
    latitude: Yup
        .number()
        .required('Latitude is required')
        .min(1, "Minimum value should 1"),
    media: Yup
        .mixed()
        .required('Media is required'),
    badgeId: Yup
        .string()
        .notRequired(),
    category: Yup
        .string()
        .required('Category is required'),
    giveaways_type: Yup
        .string()
        .required('Giveaways type is required'),
    required_tokens: Yup.number()
        .when('giveaways_type', {
            is: 'Misc',
            then: (schema) => schema.required("Token is required").min(1, "Minimum value should 1"),
            otherwise: (schema) => schema.notRequired()
        }),
    //expires date must be equal or after today
    expires_date: Yup.date()
        .min(yesterday, "Expiry date must be today or later")
        .notRequired(),
});


export { uploadcheckinschema }