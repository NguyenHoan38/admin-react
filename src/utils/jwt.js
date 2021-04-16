// const ACCESS_TOKEN_KEY = "app_access_token";

import { COOKIE_USER, COOKIE_AUTH } from "./../components/auth/constants";
import Cookies from "js-cookie";
const REFRESH_TOKEN_KEY = "app_refresh_token";
const EXPIRED_TOKEN = "app_expired_in";

// export const getAccessToken = () => {
//   // Check expired token
//   // if ()

//   return window.localStorage.getItem(ACCESS_TOKEN_KEY);
// };

export const getRefreshToken = () => {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getExpiredToken = () => {
    return window.localStorage.getItem(EXPIRED_TOKEN);
};
export const getAccessToken = () => {

    return Cookies.get(COOKIE_USER);
};
export const getAuth = () => {
    console.log('Cookies.get(COOKIE_AUTH)', Cookies.get(COOKIE_AUTH));
    if (Cookies.get(COOKIE_AUTH)) {
        console.log('JSON.parse(Cookies.get(COOKIE_AUTH)) ', JSON.parse(Cookies.get(COOKIE_AUTH)));

    }
    return Cookies.get(COOKIE_AUTH) ? JSON.parse(Cookies.get(COOKIE_AUTH)) : null;
};
export const saveAuth = (auth) => {
    alert(3)
    console.log('fsfsfsfsfsfsfsf saveAuth', auth);
    Cookies.set(COOKIE_AUTH, JSON.stringify(auth), { expires: 2 });
};
export const saveToken = (access_token) => {
    // console.log('66666666666666666666666 access_token', access_token);
    alert(3)
    // only minute: (1 / 1440) * expired_at    cons
    Cookies.set(COOKIE_USER, access_token, { expires: 2 });
    console.log('111111111111111111111', Cookies.get(COOKIE_USER));
};

// export const saveToken = (access_token, refresh_token, expired_in) => {
//   window.localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
//   window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
//   window.localStorage.setItem(EXPIRED_TOKEN, expired_in);
// };

export const destroyToken = () => {
    Cookies.remove(COOKIE_USER, { path: "/" });
    Cookies.remove(COOKIE_AUTH, { path: "/" });
    localStorage.clear();
    //router.push("/login");
};

export default {
    getAccessToken,
    getRefreshToken,
    getExpiredToken,
    saveToken,
    destroyToken,
    getAuth,
    saveAuth,
};
