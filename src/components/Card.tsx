import ProCard from '@ant-design/pro-card'
import React, { useState } from 'react'
import { Avatar } from 'antd'
import {
    LikeOutlined,
    LikeFilled,
    BookOutlined,
    BookFilled,
    FormOutlined,
    DeleteOutlined,
    CommentOutlined
} from '@ant-design/icons';
import { getAllPost, loadingState } from '../redux/reducers/auth.reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import moment from 'moment';
import { ModalInput } from './ModalInput';
import { ModalComments } from './ModalComments';

export type postType = {
    _id: string,
    content: string,
    user:
    {
        _id: string,
        username: string,
        image: string
    },
    comments: [
        {
            commenter: {
                image: string,
                _id: string,
                username: string
            },
            comment: string,
            date: string,
            _id: string
        }
    ],
    bookmarks: string[],
    likes: string[],
    createdAt: string
    updatedAt: string
    __v: number
}

export const Card = ({ data }: { data: postType }) => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.auth.user)
    const [isModalOpenInput, setIsModalOpenInput] = useState<boolean>(false);
    const [isModalOpenComments, setIsModalOpenComments] = useState<boolean>(false);


    // like post 
    const likePost = async (status: string, method: string) => {
        dispatch(loadingState(true));
        await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/${user?._id}/posts/${data?._id}/${status}`,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .catch(error => console.log(error))
        dispatch(getAllPost())
        dispatch(loadingState(false));
    }


    // delete post 
    const deletePost = async () => {
        dispatch(loadingState(true));
        await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/${user?._id}/posts/${data?._id}`,
            {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .catch(error => console.log(error))
        dispatch(getAllPost())
        dispatch(loadingState(false));
    }

    const actionBar = () => {
        let actionOptions = []
        actionOptions.push(
            <div>
                {data?.likes?.includes(user?._id) ?
                    <LikeFilled title='Like' onClick={() => likePost('unlike', 'delete')} /> :
                    <LikeOutlined title='Like' onClick={() => likePost('like', 'post')} />}{data?.likes?.length}
            </div>,
            <div>
                {data?.bookmarks?.includes(user?._id) ?
                    <BookFilled title='Bookmark' onClick={() => likePost('bookmark', 'delete')} /> :
                    <BookOutlined title='Bookmark' onClick={() => likePost('bookmark', 'post')} />}
            </div>,
            <div onClick={() => setIsModalOpenComments(true)}> <CommentOutlined title='Comment' />{data?.comments?.length}</div>,)

        if (data?.user?._id == user?._id) {
            actionOptions.push(
                <FormOutlined title='Update' onClick={() => setIsModalOpenInput(true)} />,
                <DeleteOutlined title='Delete' onClick={deletePost} />)
        }
        return actionOptions
    }


    return (
        <ProCard
            layout='center'
            colSpan='30%'
            className='max-width'
            headerBordered
            title={
                <div className='flex items-center gap-2'>
                    <Avatar src={data?.user?.image} />
                    <h3>@{data?.user?.username}</h3>
                </div>}
            extra={<p className='text-gray-400'>{moment(data?.updatedAt).calendar()}</p>}
            actions={actionBar()}
        >
            {data?.content}
            <ModalInput isModalOpen={isModalOpenInput} setIsModalOpen={setIsModalOpenInput} data={data} />
            <ModalComments isModalOpen={isModalOpenComments} setIsModalOpen={setIsModalOpenComments} data={data} />
        </ProCard >
    )
}