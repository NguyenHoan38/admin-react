// import { notification } from "ant-design-vue";
// import JWT from "@/utils/jwt";
import JWT from "./jwt";
// import { APP_CONFIG } from "@/utils/constants";
import { APP_CONFIG } from "./constants";
// import router from "@/router";

class HttpService {
  constructor() { }

  async request(url = "", method = "GET", payload, isUpload = false) {
    const options = {
      method,
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      headers: {
        Accept: "application/json",
        // 'Content-type': 'application/json;charset=UTF-8',
        // Cache: 'no-cache',
        // common: {
        // 	'X-Requested-With': 'XMLHttpRequest',
        // },
      },
    };
    if (!isUpload) {
      // options.headers['Content-type'] = 'multipart/form-data';
      options.headers["Content-type"] = "application/json;charset=UTF-8";
      // delete options.headers['Content-Type'];
    }
    if (JWT.getAccessToken()) {
      options.headers["Authorization"] = `Bearer ${JWT.getAccessToken()}`;
    }

    if (method === "GET") {
      console.log('APP_CONFIG.apiUrl APP_CONFIG.apiUrl', APP_CONFIG);
      url += "?" + this.querySearch(payload);
    } else {
      // options.body = JSON.stringify(payload);
      options.body = !isUpload ? JSON.stringify(payload) : payload;
    }

    return fetch(APP_CONFIG.apiUrl + url, options).then((res) => {
      let headers = res.headers.get("content-type");
      if (headers == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        return res;
      }
      return res.json().then((data) => {
        if (!res.ok) {
          this.handleErorr(res);
          const arrErr = Object.values(data);
          arrErr.join(" - ");
          this.showNotiAlert(arrErr);
        }
        if (Array.isArray(data)) {
          return { data, status: res.ok };
        } else {
          return { ...data, status: res.ok };
        }
      });
    });
  }

  querySearch(params) {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
  }

  get(url, params = {}) {
    return this.request(url, "GET", params);
  }

  post(url, payload) {
    return this.request(url, "POST", payload);
  }

  put(url, payload) {
    return this.request(url, "PUT", payload);
  }

  delete(url, payload) {
    return this.request(url, "DELETE", payload);
  }

  async upload(url, fileData, isMap = false) {
    if (fileData) {
      let formData = fileData;
      if (!isMap) {
        formData = await this.mapFilePayload(fileData);
      }
      if (formData) {
        return this.request(url, "POST", formData, true);
      }
    } else {
      this.showNotiAlert("Bạn chưa chọn file để tải lên");
    }
  }

  mapFilePayload(data) {
    const formData = new FormData();
    Object.keys(data).map(function (key) {
      formData.append(key, data[key]);
      // if(index === lengthDataKey - 1) {
      // }
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
      // txtErr = err.data.message ? err.data.message : 'Đã xảy ra lỗi';
      // txtErr = err.message ? err.message : 'Đã xảy ra lỗi';
      // self.showNotiAlert(txtErr)
    }
  }

  checkCodeErr(code) {
    switch (code) {
      case 401:
        JWT.destroyToken();
        // router.push("/dang-nhap");
        break;
      case 403:
        // router.push("/");
        break;
    }
  }

  showNotiAlert(txt) {
    console.log('fsfsfsf')
    // Vue.$toast.error(txt)
    // notification["error"]({
    //   message: "Lỗi",
    //   description: txt,
    // });
  }
}
export default new HttpService();
