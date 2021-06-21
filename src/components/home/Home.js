import React, { useState } from 'react';
// import './../../assets/home.scss';
import PropTypes from 'prop-types';
import JWT from "./../../utils/jwt";
import { useHistory } from 'react-router';
import { Layout, Menu } from 'antd';
import TreeData from "./table"
import 'antd/dist/antd.css';
import { Popover, Button, Modal } from 'antd';
// import { Modal, Button } from 'antd';
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
    function addProduct() {
        history.replace('/product')
    };
    const history = useHistory()
    function handelLogout() {
        JWT.destroyToken();
        history.replace('/')
        // router.push({ name: "login" });
    }
    return (
        <div>
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                <div className="content-tile">
                    <Button type="primary" >
                        <Link to="/product">Thêm mới</Link>
                    </Button>
                    <div>
                        <Button type="primary" className="mr-2">
                            Vietnamese
                        </Button>
                        <Button type="primary" >
                            English
                        </Button>
                    </div>
                </div>
                <TreeData />
            </Content>
        </div>
    );
}
export default Home;
