import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, DatePicker, Avatar, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/reducers/auth.reducers';
import { RootState } from '../redux/store/store';


type FieldType = {
    email?: string
    username?: string;
    name?: string
    img?: string
    password?: string;
    confirmPassword?: string;
};

export const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const [newValues, setNewValues] = useState({
        email: user?.email,
        username: user?.username,
        name: user?.name,
        image: user?.image
    })

    useEffect(() => {
        if (user?._id) {
            setNewValues({
                email: user?.email,
                username: user?.username,
                name: user?.name,
                image: user?.image
            })
        }
    }, [user])

    const valuesChange = (key: string, v: string) => {
        setNewValues({ ...newValues, [key]: v })
    }

    const onFinish = async () => {

        let arr = {
            email: newValues.email,
            username: newValues.username,
            name: newValues.name,
            image: newValues.image,
        }

        await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/${user?._id}/updateUser`,
            {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(arr)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message == 'User details updated successfully') {
                    dispatch(logIn({ ...arr, _id: user?._id }))
                    message.success(data.message, 2);
                }
                else {
                    message.error('Something went wrong', 2);
                }
            })
            .catch(error => console.log(error))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return user?._id?.length ? (
        <main className='max-width' >
            <Form
                name="basic"
                initialValues={{
                    ['email']: newValues?.email,
                    ['username']: newValues?.username,
                    ['img']: newValues?.image,
                    ['name']: newValues?.name,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item<FieldType>
                    label="E-Mail"
                    name="email"
                >
                    <Input placeholder='Your Email!' data-testid='profileEmail' type='email' onChange={(e) => valuesChange('email', e.target.value)} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                >
                    <Input placeholder='Your Username!' data-testid='profileUsername' onChange={(e) => valuesChange('username', e.target.value)} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Image"
                    name="img"
                >
                    <Select
                        style={{ width: '76px' }}
                        className='h-[40px] flex'
                        data-testid='profileimage'
                        onChange={(e) => valuesChange('image', e)}
                        options={[
                            { value: "/avatar_1.avif", label: <Avatar src='/avatar_1.avif' /> },
                            { value: "/avatar_2.avif", label: <Avatar src='/avatar_2.avif' /> },
                            { value: "/avatar_3.avif", label: <Avatar src='/avatar_3.avif' /> },
                            { value: "/avatar_4.avif", label: <Avatar src='/avatar_4.avif' /> },
                            { value: "/avatar_5.avif", label: <Avatar src='/avatar_5.avif' /> },
                            { value: "/avatar_6.avif", label: <Avatar src='/avatar_6.avif' /> },
                            { value: "/avatar_7.avif", label: <Avatar src='/avatar_7.avif' /> }
                        ]}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Name"
                    name="name"
                >
                    <Input placeholder='Your Name!' data-testid='profileName' onChange={(e) => valuesChange('name', e.target.value)} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit" data-testid='profileBtn' >
                        Update
                    </Button>
                </Form.Item>

            </Form>
        </main>
    ) : <></>
}
