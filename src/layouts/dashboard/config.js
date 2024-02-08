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
import Brands from '@heroicons/react/24/solid/PresentationChartBarIcon';
import Districts from '@heroicons/react/24/solid/RectangleGroupIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Home',
    path: '/admin',
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
    path: '/plethorium',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Badges',
    path: '/badges',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Check Ins',
    path: '/checkins',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Drops',
    path: '/drops',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Notification',
    path: '/notifications',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Library',
    path: '/library',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'NFC & QR',
    path: '/nfc',
    icon: (
      <SvgIcon fontSize="small">
        <QRIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Brands',
    path: '/brands',
    icon: (
      <SvgIcon fontSize="small">
        <Brands />
      </SvgIcon>
    )
  },
  {
    title: 'Districts',
    path: '/districts',
    icon: (
      <SvgIcon fontSize="small">
        <Districts />
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
