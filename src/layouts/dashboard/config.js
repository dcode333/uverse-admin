import ChartBarIcon from '@heroicons/react/24/solid/Squares2X2Icon';
import CogIcon from '@heroicons/react/24/outline/MapPinIcon';
import LockClosedIcon from '@heroicons/react/24/solid/CursorArrowRippleIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/BuildingOffice2Icon';
import UserIcon from '@heroicons/react/24/solid/StarIcon';
import UserPlusIcon from '@heroicons/react/24/outline/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/ViewColumnsIcon';
import QRIcon from '@heroicons/react/24/solid/QrCodeIcon';
import SettingIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import LogoutIcon from '@heroicons/react/24/solid/ArrowRightOnRectangleIcon';

import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Home',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Users',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Plethorium',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Badges',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Check Ins',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Drops',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Notification',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Library',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'NFC & QR',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <QRIcon />
      </SvgIcon>
    )
  }

];

export const account = [
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <SettingIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Logout',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LogoutIcon />
      </SvgIcon>
    )
  }
];
