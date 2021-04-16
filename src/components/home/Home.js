import React, { useState } from 'react';
import './../../App.css';
import PropTypes from 'prop-types';
import JWT from "./../../utils/jwt";
import { useHistory } from 'react-router';
import { Layout, Menu } from 'antd';
import TreeData from "./table"
import 'antd/dist/antd.css';
import { Popover, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
Home.propTypes = {

};

function Home(props) {
    const text = <span>Title</span>;
    const content = (
        <div>
            <button onClick={handelLogout}>Logout</button>
            <button >Profle</button>
        </div>
    );
    const [collapsed, setState] = useState(true)

    // state = {
    //     collapsed: false,
    // };
    function toggle() {
        setState({
            collapsed: !collapsed
        });
    };
    const history = useHistory()
    function handelLogout() {
        JWT.destroyToken();
        history.replace('/')
        // router.push({ name: "login" });
    }
    return (
        <div>
            <Layout>
                <Sider trigger={null} >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/home">nav</Link>

                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            nav 2
            </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            nav 3
            </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            // onClick: { toggle }
                            onClick: toggle
                        })}

                    </Header> */}
                    <Header className="header">
                        <div className="logo" />
                        <Popover placement="bottomRight" title={text} content={content} trigger="click">
                            <Button>BR</Button>
                        </Popover>
                        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu> */}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <TreeData />
                    </Content>
                </Layout>
            </Layout>
            {/* <button onClick={handelLogout}>logout</button> */}
        </div>
    );
}

export default Home;
