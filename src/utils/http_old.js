import Vue from "vue";
import * as axios from "axios";
// import Cookies from 'js-cookie';
// import JWT from "@/utils/jwt";
import { APP_CONFIG } from "@/utils/constants";
// import router from "@/router";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

axios.defaults = {
  baseURL: APP_CONFIG.apiUrl,
  withCredentials: false,
  credentials: "include",
  crossDomain: true,
};

class HttpService {
  constructor() { }

  configRequest(multipart = false) {
    let defaultHeaders = DEFAULT_HEADERS;
    if (multipart) {
      defaultHeaders = {};
    }

    if (JWT.getAccessToken()) {
      defaultHeaders = {
        Authorization: `Bearer ${JWT.getAccessToken()}`,
        Accept: "application/json",
        Cache: "no-cache",
        common: {
          "X-Requested-With": "XMLHttpRequest",
        },
        ...defaultHeaders,
      };
    }

    return {
      headers: defaultHeaders,
    };
  }

  querySearch(params) {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
  }

  get(apiEndpoint, params = {}) {
    if (Object.keys(params).length > 0) {
      apiEndpoint = `${apiEndpoint}?${this.querySearch(params)}`;
    }
    return axios
      .get(APP_CONFIG.apiUrl + apiEndpoint, this.configRequest())
      .then(
        (res) => {
          if (res.data.errors) {
            this.handleErorr(res.data.errors);
          }
          return res;
        },
        (err) => {
          this.handleErorr(err.response);
        }
      );
  }

  post(apiEndpoint, payload) {
    return axios
      .post(APP_CONFIG.apiUrl + apiEndpoint, payload, this.configRequest())
      .then(
        (res) => {
          if (res.data.errors) {
            this.handleErorr(res.data.errors);
          }
          return res;
        },
        (err) => {
          this.handleErorr(err.response);
        }
      );
  }

  put(apiEndpoint, payload) {
    return axios
      .put(APP_CONFIG.apiUrl + apiEndpoint, payload, this.configRequest())
      .then(
        (res) => {
          if (res.data.errors) {
            this.handleErorr(res.data.errors);
          }
          return res;
        },
        (err) => {
          this.handleErorr(err.response);
        }
      );
  }

  delete(apiEndpoint) {
    return axios
      .delete(APP_CONFIG.apiUrl + apiEndpoint, this.configRequest())
      .then(
        (res) => {
          if (res.data.errors) {
            this.handleErorr(res.data.errors);
          }
          return res;
        },
        (err) => {
          this.handleErorr(err.response);
        }
      );
  }

  async uploadFile(apiEndpoint, fileData, isMap = false) {
    if (fileData) {
      let formData = fileData;
      if (!isMap) {
        formData = await this.mapFilePayload(fileData);
      }
      if (formData) {
        return axios
          .post(
            APP_CONFIG.apiUrl + apiEndpoint,
            formData,
            this.configRequest(true)
          )
          .then(
            (res) => {
              if (res.data.errors) {
                this.handleErorr(res.data.errors);
              }
              return res;
            },
            (err) => {
              this.handleErorr(err.response);
            }
          );
      }
    } else {
      this.showNotiAlert("Bạn chưa chọn file để tải lên");
    }
  }

  mapFilePayload(data) {
    let formData = new FormData();
    Object.keys(data).map(function (key, index) {
      formData.append(key, data[key]);
    });
    return formData;
  }

  handleErorr(err) {
    let self = this;
    let txtErr = "Đã xảy ra lỗi";

    if (Array.isArray(err)) {
      err.map((er) => {
        txtErr = er.message;
        self.checkCodeErr(er.code);
        self.showNotiAlert(txtErr);
      });
    } else {
      self.checkCodeErr(err.status);
      txtErr = err.data.message ? err.data.message : "Đã xảy ra lỗi";
      self.showNotiAlert(txtErr);
    }
  }

  checkCodeErr(code) {
    switch (code) {
      case 401:
        // JWT.destroyToken();
        router.push("/trang-chu");
        break;
      case 403:
        // router.push("/");
        break;
      default:
        // router.push('/');
        break;
    }
  }

  showNotiAlert(txt) {
    // Vue.$toast.error(txt);
    // notification['error']({
    //   		message: 'Lỗi',
    //     description: txt
    // });
  }
}
export default new HttpService();
