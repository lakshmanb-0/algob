import React, { useEffect, useState } from 'react'
import { Card, postType } from '../components/Card'
import { Empty, Flex } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store/store'
import { getAllPost } from '../redux/reducers/auth.reducers'

export const BookMark = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const allPosts = useSelector((state: RootState) => state.auth.posts)
    const [posts, setPosts] = useState<postType[]>(allPosts.filter((el: postType) => el.likes.includes(user?._id)))

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAllPost())
    }, [])

    useEffect(() => {
        setPosts(allPosts.filter(el => el.bookmarks.includes(user?._id)))
    }, [allPosts])

    return posts?.length ? (
        <Flex gap="large" align="center" vertical className='mt-10'>
            {posts?.map(el => (
                <Card data={el} key={el?._id} />
            ))}
        </Flex>
    )
        : <Empty description='No Bookmark Posts found' />

}
