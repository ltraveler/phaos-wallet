import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { ProfileIcon } from '@/components/icons/profile';
import { ExchangeIcon } from '@/components/icons/exchange';

export const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  // {
  //   name: 'Swap',
  //   icon: <ExchangeIcon />,
  //   href: routes.swap,
  // },
  // {
  //   name: 'Profile',
  //   icon: <ProfileIcon />,
  //   href: routes.profile,
  // },
  {
    name: 'Help',
    icon: <HomeIcon />,
    href: routes.home,
    dropdownItems: [
      {
        name: 'Support',
        href: routes.home,
      },
    ],
  },
];
