import React, { useEffect, useState } from 'react'
import { ProTable } from '@ant-design/pro-components'
import type { ProColumns } from "@ant-design/pro-components";
import { DeletePopConfirm } from '../components/DeletePopConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { getAllPost, loadingState } from '../redux/reducers/auth.reducers';
import { Empty, message } from 'antd';
import { DeleteFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import moment from 'moment';
import { postType } from '../components/Card';


export type TableListItem = {
    key: string,
    CreatedAt: string,
    PostContent: string,
    Comments: number,
    CommentsArr: {
        commenter: {
            image: string,
            _id: string,
            username: string,
        },
        comment: string,
        date: string,
        _id: string
    }[],
    Action: any,
    Likes: number
};

type commentArr = {
    key: string,
    date: string,
    username: string,
    comment: string,
    action: any
}

export const MyPosts = () => {
    const [posts, setPosts] = useState<TableListItem[]>([])
    const user = useSelector((state: RootState) => state.auth.user)
    const allPosts = useSelector((state: RootState) => state.auth.posts)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAllPost())
    }, [])

    // delete post 
    const deletePost = async (id: string) => {
        dispatch(loadingState(true));
        await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/${user?._id}/posts/${id}`,
            {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (response.ok) {
                    message.success('Post Deleted', 2);
                    dispatch(getAllPost())
                    dispatch(loadingState(false));
                }
            })
            .catch(error => console.log(error))
        dispatch(loadingState(false));
    }

    // allPosts data 
    useEffect(() => {
        let postArr: TableListItem[] = [];
        allPosts?.map((el: postType, index: number) => {
            let newPost = {
                key: el?._id,
                PostContent: el?.content,
                Comments: el?.comments?.length,
                Likes: el?.likes?.length,
                CreatedAt: moment(el?.updatedAt).format('LLL'),
                CommentsArr: el?.comments,
                Action: <DeleteFilled data-testid={index == 3 ? 'deletePostPage' : ''} className='text-red-500 text-center mx-auto cursor-pointer' onClick={() => deletePost(el?._id)} />
            }
            el?.user?._id == user?._id && postArr.push(newPost)
        })
        setPosts(postArr)
    }, [allPosts, dispatch])

    // expandable row or comment row data 
    const expandedRowData = (el: TableListItem) => {
        let data: commentArr[] = []
        const deleteFunction = async (id: string) => {
            dispatch(loadingState(true));
            await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/${user?._id}/posts/${el?.key}/comments/${id}`,
                {
                    method: 'delete',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        message.success('Comment Deleted', 2);
                        dispatch(getAllPost())
                    }
                })
                .catch(error => console.log(error))
            dispatch(loadingState(false));
        }
        el?.CommentsArr?.map((el: any, index: number) => {
            let comments = {
                key: el?._id,
                date: moment(el?.date).format('LLL'),
                username: el?.commenter?.username,
                comment: el?.comment,
                action: <DeletePopConfirm
                    testing={index == 0 ? true : false}
                    onConfirm={() => deleteFunction(el?._id)}
                    title="Delete this comment"
                    description="Are you sure to delete this Comment?" />,
            }
            data.push(comments)
        })


        return (
            <ProTable
                columns={[
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                    { title: 'userName', dataIndex: 'username', key: 'username' },
                    { title: 'Comment', dataIndex: 'comment', key: 'comment' },
                    { title: 'Action', dataIndex: 'action', key: 'action' },
                ]}
                headerTitle={false}
                search={false}
                options={false}
                dataSource={data}
                pagination={false}
            />
        );
    };

    // columns for table 
    const columns: ProColumns<TableListItem>[] = [
        {
            title: "Created At",
            dataIndex: "CreatedAt",
        },
        {
            title: "Post Content",
            dataIndex: "PostContent",
        },
        {
            title: "Likes",
            dataIndex: "Likes",
        },
        {
            title: "Comments",
            dataIndex: "Comments",
        },
        {
            title: "Action",
            dataIndex: "Action",
        },
    ];

    return (
        posts?.length ? <ProTable
            columns={columns}
            request={() => {
                return Promise.resolve({
                    data: posts,
                    success: true,
                });
            }}
            rowKey="key"
            pagination={{
                pageSize: 10,
                showTotal(total, range) {
                    return `Showing ${range.join('-')} of ${total} total`
                },
                onChange: (page) => console.log(page),
            }}
            expandable={{
                expandedRowRender: (item) => expandedRowData(item),
                expandIcon: ({ expanded, onExpand, record }) => (
                    <span
                        data-testid={`expandComment${record.key}`}
                        onClick={(e) => onExpand(record, e)}
                        className='cursor-pointer'
                    >
                        {expanded ? <MinusOutlined /> : <PlusOutlined />}
                    </span>)
            }}
            search={false}
            dateFormatter="string"
            options={false}
        /> : <Empty description='No post uploaded' />
    )
}
