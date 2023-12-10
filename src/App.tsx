import React from 'react'
import './App.css';
import Layout from './components/Layout';
import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Likes } from './pages/Likes';
import { BookMark } from './pages/Bookmark';
import { MyPosts } from './pages/MyPosts';
import { Profile } from './pages/Profile';
import { Spin, message } from 'antd'
import { LoginIn } from './pages/LoginIn';
import { SignUp } from './pages/SignUp';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/store';

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const { loading } = useSelector((state: RootState) => state.auth)

  return (
    <>
      <Spin spinning={loading}>
        {/* layout  */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/like" element={<Likes />} />
            <Route path="/bookmark" element={<BookMark />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/profile" element={<Profile />} />

            {/* auth  */}
            <Route path="/log-in" element={<LoginIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Layout>
      </Spin>
      {/* toast  */}
      {contextHolder}
    </>
  );
}

export default App;
