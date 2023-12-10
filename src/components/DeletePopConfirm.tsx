import React from 'react'
import { DeleteFilled } from '@ant-design/icons'
import { Popconfirm } from 'antd'

type deleteProp = {
    onConfirm: any,
    title: string,
    description: string,
    testing?: boolean
}

export const DeletePopConfirm = ({ onConfirm, title, description, testing }: deleteProp) => {
    return (
        <Popconfirm
            title={title}
            description={description}
            okText="Yes"
            cancelText="No"
            onConfirm={() => onConfirm()}
            okButtonProps={{ 'data-testid': testing ? 'Confimrdelete' : '', 'type': 'primary' }}
        >
            <DeleteFilled className='text-red-500 text-center mx-auto cursor-pointer' data-testid={testing ? "deletePost" : ''} />
        </Popconfirm>
    )
}
