import React, { useEffect, useState } from 'react'
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defaultProps from './defaultProps';
import { Dropdown, Spin, } from 'antd';
import { LogoutOutlined, } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { logIn, logOut } from '../redux/reducers/auth.reducers';


const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [pathname, setPathname] = useState<string>(location.pathname);
    const { loading, user } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()

    // setting localStorage and navigate if user not found 
    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatch(logIn(JSON.parse(localStorage.getItem('user') ?? '')))
        }
        else if (!user?.username) {
            setPathname('/log-in')
            return navigate('/log-in')
        }
    }, [])

    return (
        <ProLayout
            prefixCls="my-prefix"
            {...defaultProps}
            location={{
                pathname,
            }}
            hide={['/sign-up', '/log-in'].includes(location.pathname)}
            disableMobile={['/sign-up', '/log-in'].includes(location.pathname)}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
                <div
                    onClick={() => {
                        setPathname(item.path ?? location.pathname);
                        navigate(item.path ?? location.pathname)
                    }}
                >
                    {dom}
                </div>
            )}
            title='xTweet'
            logo='/favicon.ico'
            avatarProps={{
                src: user?.image,
                size: 'small',
                title: user?.username,
                render: (props, dom) => {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: 'logout',
                                        icon: <LogoutOutlined />,
                                        label: 'Logout',
                                    },
                                ],
                                onClick(e) {
                                    dispatch(logOut())
                                    navigate('/log-in')
                                },
                            }}
                        >
                            {dom}
                        </Dropdown>
                    );
                },
            }}>
            <PageContainer >
                {children}
            </PageContainer>
        </ProLayout>

    )
}
export default Layout
