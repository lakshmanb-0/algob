import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { loadingState, logIn } from '../redux/reducers/auth.reducers';
import { RootState } from '../redux/store/store';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export const LoginIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        if (user?._id) {
            navigate('/')
        }
    }, [])


    const onFinish = async (values: FieldType) => {
        let arr = {
            username: values.username,
            password: values.password,
        }
        dispatch(loadingState(true));
        await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/login`,
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
                if (data.message == 'Login successful') {
                    dispatch(logIn(data.user))
                    message.success(data.message, 2);
                    navigate('/')
                }
                else {
                    message.error('No user Found', 2);
                }
            })
        dispatch(loadingState(false));
    };

    return (
        <main className='max-width'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <h1 className='pb-8 text-center text-3xl font-medium'>Log in</h1>
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input data-testid='LoginUsername' prefix={<UserOutlined className="site-form-item-icon" />} placeholder='Your Username!' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password data-testid='LoginPassword' placeholder='Your Password!' prefix={<LockOutlined className="site-form-item-icon" />} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                    <Button htmlType="submit" className="w-full mx-auto mb-2 mt-5" data-testid='LoginBtn' >
                        Log in
                    </Button>
                    <h4>Or <p onClick={() => navigate('/sign-up')} className='inline hover:text-blue-300 cursor-pointer' data-testid='login-to-sign'>register now!</p></h4>
                </Form.Item>

            </Form>
        </main >
    )
}
