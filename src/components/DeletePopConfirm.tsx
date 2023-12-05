import React from 'react'
import { DeleteFilled } from '@ant-design/icons'
import { Popconfirm } from 'antd'

type deleteProp = {
    onConfirm: any,
    title: string,
    description: string,
}

export const DeletePopConfirm = ({ onConfirm, title, description }: deleteProp) => {
    return (
        <Popconfirm
            title={title}
            description={description}
            okText="Yes"
            cancelText="No"
            onConfirm={() => onConfirm()}
        >
            <DeleteFilled className='text-red-500 text-center mx-auto cursor-pointer' />
        </Popconfirm>
    )
}
