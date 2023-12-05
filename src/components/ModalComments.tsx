import { Avatar, Button, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost, loadingState } from '../redux/reducers/auth.reducers';
import { AppDispatch, RootState } from '../redux/store/store';
import { postType } from './Card';

type menuInput = {
    isModalOpen: boolean,
    setIsModalOpen: any,
    data: postType
}

export const ModalComments = ({ isModalOpen, setIsModalOpen, data }: menuInput) => {

    const [postComment, setPostComment] = useState(data?.comments)
    const [postInput, setPostInput] = useState<string>('')

    const { user, loading } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        setPostComment(data?.comments)
    }, [data])

    // update post 
    const AddComment = async () => {
        dispatch(loadingState(true));
        await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/${user?._id}/posts/${data?._id}/comments`,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    commenter: user?._id,
                    comment: postInput
                })
            })
            .then(response => response.json())
            .catch(error => console.log(error))
        setPostInput('')
        dispatch(getAllPost())
        dispatch(loadingState(false));
    }


    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <Modal
            title="Comment Section"
            open={isModalOpen}
            onOk={AddComment}
            onCancel={handleCancel}
            footer={() => (
                <div className='mt-10'>
                    <Button key='cancel' onClick={handleCancel}>Cancel</Button>
                    <Button key='submit' onClick={AddComment} loading={loading}>Add</Button>
                </div>
            )}>
            {postComment?.map((el: any) => (
                <div className='flex items-center gap-2 my-3'>
                    <Avatar src={el?.commenter?.image} />
                    <h1 className='text-gray-300'>@{el?.commenter?.username}</h1>
                    <p>{el?.comment}</p>
                </div>
            ))}
            <div className='mt-10'>
                <Input placeholder='Add a Comment...' value={postInput} onChange={(e) => setPostInput(e.target.value)} />
            </div>
        </Modal>
    )
}
