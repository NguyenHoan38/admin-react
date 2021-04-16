import React, { useContext, useEffect, useState } from 'react';
// import { Route, useLocation, Redirect, useHistory } from 'react-router-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// import loadable from 'react-loadable';
// import LoadingComponent from '../../Loading';
// import { Layout } from 'antd';
// // import { makeStyles } from "@material-ui/core/styles";
// import { AuthContext, UserDetailContext } from "App";
// import CountryCurrency from '../../Modal/CountryCurrency';
// import { path } from "ramda";


// const { Content } = Layout;

// const useStyles = makeStyles((theme) => ({
//     content: {
//         minHeight: '77vh !important',
//         backgroundColor: "#eeeeee !important",
//         fontFamily: "'Open Sans'"
//     }
// }));

let Dashboard = loadable({
    loader: () => import('pages/dashboard/index'),
    loading: LoadingComponent
})
let auth = loadable({
    loader: () => import('pages/auth/index'),
    loading: LoadingComponent
})

function AppContent() {
    // const classes = useStyles();
    // const { authContext, setAuthContext } = useContext(AuthContext);
    // const { accountDetail, setAccountDetail } = useContext(UserDetailContext);
    // const [isDownload, setIsDownload] = useState(true);
    // const location = useLocation();
    // const history = useHistory();

    // useEffect(() => {
    //     // let title = history.location.pathname
    //     document.title = "INMERGERS";
    // });

    // useEffect(() => {
    //     if (!authContext.isAuthenticated) {
    //         if (location.pathname === "/dashboard") {
    //             history.push("/home")
    //         }
    //     }
    // }, [location])

    return (
        // <Content id='app-content'>

        // </Content>
        <React.Fragment>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={auth} />
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default AppContent;
