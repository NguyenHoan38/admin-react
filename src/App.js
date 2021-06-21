import './App.css';
import { COOKIE_USER, COOKIE_AUTH } from "./components/auth/constants";
import { apilogin } from "./api/index"
import LoginForm from "./components/auth/LoginForm"
import Home from "./components/home/Home"
// import Product from "./components/home/Product"
import JWT from "./utils/jwt";
import { APP_CONFIG } from "./utils/constants";
import { BrowserRouter, Route, Link, Redirect, useHistory } from 'react-router-dom';
// import { getAuth,JWT } from "./utils/jwt";
// import React from 'react';
import Cookies from "js-cookie";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Popover, Button, Modal } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
function App(props) {
  // var browserHistory = ReactRouter.browserHistory;
  // const BrowserHistory = ReactRouter.BrowserHistory
  const history = useHistory()
  function handelLogout() {
    JWT.destroyToken();
    history.replace('/login')
    // router.push({ name: "login" });
  }
  // const BrowserHistory = require('')
  function pageNext() {
    return "/home"
  }
  const [collapsed, setCollapsed] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  function handleOk() {
    setIsModalVisible(false);
  };

  function handleCancel() {
    setIsModalVisible(false);
  };
  // state = {
  //     collapsed: false,
  // };
  function toggle() {
    setCollapsed(!collapsed);
  };
  const text = <span>Title</span>;
  const content = (
    <div>
      <button onClick={handelLogout}>Logout</button>
      <button >Profle</button>
    </div>
  );

  return (
    Cookies.get(COOKIE_USER) ?
      <>
        <div>
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                <Menu.Item key="1" icon={<UserOutlined />}>
                  {/* <Link to="/home">nav</Link> */}

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
              <Header className="site-layout-background" style={{ padding: 0 }}>
                <MenuUnfoldOutlined onClick={() => toggle()} />
                <Popover placement="bottomRight" title={text} content={content} trigger="click">
                  <Button>BR</Button>
                </Popover>
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <React.Fragment>
                  < BrowserRouter >
                    <Route path="/home" render={() => {
                      return Cookies.get(COOKIE_USER) ? alert(4) : <Redirect to='/' ></Redirect>
                    }} >
                    </Route>
                    {/* <Route path="/product" render={() => {
                      return Cookies.get(COOKIE_USER) ? <Product /> : <Redirect to='/' ></Redirect>
                    }} >
                    </Route> */}
                    < BrowserRouter >
                      <Route path="/" render={() => {
                        return Cookies.get(COOKIE_USER) ? <Redirect to={pageNext()} ></Redirect> : <LoginForm />
                      }} />
                    </BrowserRouter>
                  </BrowserRouter >
                </React.Fragment>
              </Content>
            </Layout>
          </Layout>
        </div>
      </> :
      <React.Fragment>
        < BrowserRouter >
          <Route path="/" render={() => {
            return Cookies.get(COOKIE_USER) ? <Redirect to={pageNext()} ></Redirect> : <LoginForm />
          }} />
        </BrowserRouter>
      </React.Fragment>

  );
}

export default App;
