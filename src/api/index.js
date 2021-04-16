import HttpService from "./../utils/http"
export const apilogin = (params = {}) => {
    console.log('params params', params);
    let apiEndpoint = `login`;
    return HttpService.post(apiEndpoint, params).then((res) => {
        return res;
    });
};