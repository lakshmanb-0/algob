import {
  LikeOutlined,
  BookOutlined,
  HomeOutlined,
  InstagramOutlined,
  ProfileOutlined
} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: 'Home',
        icon: <HomeOutlined />,
      },
      {
        path: '/like',
        name: 'My Likes',
        icon: <LikeOutlined />,
      },
      {
        path: '/bookmark',
        name: 'My Bookmarks',
        icon: <BookOutlined />,
      },
      {
        path: '/my-posts',
        name: 'My Posts',
        icon: <InstagramOutlined />,
      },
      {
        path: '/profile',
        name: 'My Profile',
        icon: <ProfileOutlined />,
      },
    ],
  },
};
