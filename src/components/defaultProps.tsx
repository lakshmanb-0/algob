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
        dataId: 'homePage',
        name: 'Home',
        icon: <HomeOutlined />,
      },
      {
        path: '/like',
        name: 'My Likes',
        dataId: 'likePage',

        icon: <LikeOutlined />,
      },
      {
        path: '/bookmark',
        name: 'My Bookmarks',
        dataId: 'bookmarkPage',

        icon: <BookOutlined />,
      },
      {
        path: '/my-posts',
        dataId: 'myPosts',
        name: 'My Posts',
        icon: <InstagramOutlined />,
      },
      {
        path: '/profile',
        dataId: 'profilePage',
        name: 'My Profile',
        icon: <ProfileOutlined />,
      },
    ],
  },
};
