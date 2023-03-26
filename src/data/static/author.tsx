import CoverImage from '@/assets/images/profile-cover.jpg';
import AuthorImage from '@/assets/images/author.jpg';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Facebook } from '@/components/icons/brands/facebook';
import User1 from '@/assets/images/avatar/4.png';
import User2 from '@/assets/images/avatar/2.png';
import User3 from '@/assets/images/avatar/3.png';
import User4 from '@/assets/images/avatar/1.png';
import User5 from '@/assets/images/avatar/6.png';

export const authorData = {
  id: 157896,
  name: 'Epaphus',
  user_name: 'Munantius',
  wallet_key: '0xc4238aa031bbc95053913647123e9d118216a18e',
  created_at: 'March 2023',
  cover_image: {
    id: 1,
    thumbnail: CoverImage,
    original: CoverImage,
  },
  avatar: {
    id: 1,
    thumbnail: AuthorImage,
    original: AuthorImage,
  },
  summary: 'Some info about identity from blockchain explorer',
  status: 'Human',
  age: '23',
  pool_members: [
    {
      id: 1,
      name: 'Thirtythree',
      slug: 'thirtythree',
      avatar: {
        id: 1,
        thumbnail: User1,
        original: User1,
      },
    },
    {
      id: 2,
      name: 'Thirtythree',
      slug: 'thirtythree',
      avatar: {
        id: 1,
        thumbnail: User2,
        original: User2,
      },
    },
    {
      id: 3,
      name: 'Thirtythree',
      slug: 'thirtythree',
      avatar: {
        id: 1,
        thumbnail: User3,
        original: User3,
      },
    },
    {
      id: 4,
      name: 'Thirtythree',
      slug: 'thirtythree',
      avatar: {
        id: 1,
        thumbnail: User4,
        original: User4,
      },
    },
    {
      id: 5,
      name: 'Thirtythree',
      slug: 'thirtythree',
      avatar: {
        id: 1,
        thumbnail: User5,
        original: User5,
      },
    },
  ],
  socials: [
    {
      id: 1,
      title: '@social_link1',
      link: 'https://link1.com',
      icon: <Twitter className="w-4" />,
    },
    {
      id: 2,
      title: '@social_link2',
      link: 'https://link2.com',
      icon: <Facebook className="w-4" />,
    },
    {
      id: 3,
      title: '@social_link3',
      link: 'https://link3.com',
      icon: <Instagram className="w-4" />,
    },
  ],
  links: [
    {
      id: 1,
      title: '@link1',
      link: 'https://link1.com',
    },
    {
      id: 2,
      title: '@link2',
      link: 'https://link2.com',
    },
  ],
};
