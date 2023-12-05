import { Button, Input, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost, loadingState } from '../redux/reducers/auth.reducers';
import { AppDispatch, RootState } from '../redux/store/store';
import { postType } from './Card';

let { TextArea } = Input

type menuInput = {
    isModalOpen: boolean,
    setIsModalOpen: any,
    data: postType
}

export const ModalInput = ({ isModalOpen, setIsModalOpen, data }: menuInput) => {
    const [postText, setPostText] = useState<string>(data?.content)
    const { user, loading } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        setPostText(data?.content)
    }, [data])

    // update post 
    const updatePost = async () => {
        dispatch(loadingState(true));
        await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/${user?._id}/posts/${data?._id}`,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: postText })
            })
            .then(response => response.json())
            .catch(error => console.log(error))
        setPostText('')
        setIsModalOpen(false);
        dispatch(getAllPost())
        dispatch(loadingState(false));
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <Modal
            title="Update"
            open={isModalOpen}
            onOk={updatePost}
            onCancel={handleCancel}
            footer={() => (
                <div className='mt-10'>
                    <Button key='cancel' onClick={handleCancel}>Cancel</Button>
                    <Button key='submit' onClick={updatePost} loading={loading}>Update</Button>
                </div>
            )}>
            <TextArea placeholder="What is happening?!" autoSize value={postText} onChange={(e) => setPostText(e.target.value)} maxLength={200} showCount />
        </Modal>
    )
}
