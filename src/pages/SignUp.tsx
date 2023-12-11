import React, { useEffect } from 'react'
import { Form, Input, Button, Select, Avatar, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadingState, logIn } from '../redux/reducers/auth.reducers';
import { RootState } from '../redux/store/store';


type FieldType = {
    email?: string
    username?: string;
    name?: string
    img?: string
    password?: string;
    confirmPassword?: string;
};

export const SignUp = () => {
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
            email: values.email,
            username: values.username,
            name: values.name,
            password: values.password,
            image: values.img,
        }
        dispatch(loadingState(true));
        await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/signup`,
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
                if (data.message == 'User created successfully') {
                    dispatch(logIn({ ...arr, _id: data._id }))
                    message.success(data.message, 2);
                    navigate('/')
                }
                else {
                    message.error('User Already exist', 2);
                }
            })
        dispatch(loadingState(false));
    };


    return (
        <main className='max-width' >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <h1 className='pb-8 text-center text-3xl font-medium'>Sign Up</h1>
                <Form.Item<FieldType>
                    label="E-Mail"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input data-testid='signUpEmail' placeholder='Your Email!' type='email' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input data-testid='signUpUsername' placeholder='Your Username!' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Image"
                    name="img"
                    rules={[{ required: true, message: 'Please input your Image!' }]}
                >
                    <Select
                        style={{ width: '76px' }}
                        className='h-[40px] flex'
                        data-testid='signUpImage'
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
                    rules={[{ required: true, message: 'Please input your Name!' }]}
                >
                    <Input data-testid='signUpName' placeholder='Your Name!' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password placeholder='Your Password!'
                        data-testid='signUpPassword'
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='Re-enter Password!'
                        data-testid='signUpConfirmPassword'
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <div className='flex gap-4 mt-3'>
                        <Button onClick={() => navigate('/log-in')} data-testid='alreadyAcc'>Already a Account</Button>
                        <Button htmlType="submit" data-testid='signUpBtn'>
                            Submit
                        </Button>
                    </div>
                </Form.Item>

            </Form>
        </main>
    )
}
