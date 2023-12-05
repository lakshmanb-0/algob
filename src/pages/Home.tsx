import React, { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import ProCard from '@ant-design/pro-card'
import { Input, Avatar, Button, Flex, message, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { getAllPost, loadingState } from '../redux/reducers/auth.reducers';

let { TextArea } = Input

export const Home = () => {
    const [postText, setPostText] = useState<string>('');
    const { user, posts } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAllPost())
    }, [])

    // createPost 
    const createPost = async () => {
        dispatch(loadingState(true));
        await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/${user._id}/posts`,
            {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: postText })
            })
            .then(response => {
                if (response.ok) {
                    setPostText('')
                    message.success('Post created', 2);
                    dispatch(getAllPost())
                }
            })
            .catch(error => message.error('Something went Wrong', 2))
        dispatch(loadingState(false));
    }

    return (
        <section className='max-width'>
            <ProCard actions={<Button type='primary' className='m-3' data-test-id="createPostBtn" onClick={createPost} disabled={!postText}>Post</Button>}>
                <div className='flex sm:flex-row flex-col gap-2 py-3'>
                    <Avatar src={user?.image} />
                    <TextArea placeholder="What is happening?!" data-test-id="postText" autoSize value={postText} onChange={(e) => setPostText(e.target.value)} maxLength={200} showCount className='w-[90%]' />
                </div>
            </ProCard>
            {posts?.length ? <Flex gap="large" align="center" vertical className='mt-10'>
                {posts?.map(el => (
                    <Card data={el} key={el?._id} />
                ))}
            </Flex> : <Empty description='No Post Available' className='mt-10' />}
        </section>
    )
}
