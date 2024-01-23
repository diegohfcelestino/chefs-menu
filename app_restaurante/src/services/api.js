import axios from "axios";
import { API_URL } from '@env';

const connect = axios.create({
  baseURL: API_URL,
  timeout: 15000
});

let call;
const api = (config = {}, token = null, autoCancel = false) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(function () {
      call.cancel("canceled");
      clearInterval(interval);
    }, 8000);

    if (autoCancel) {
      call.cancel("canceled");
    }

    call = axios.CancelToken.source();
    config.cancelToken = call.token;
    config.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": `application/json; charset=utf-8`,
      "Access-Control-Allow-Origin": "*",
    };

    connect(config)
      .then(response => resolve(response))
      .catch(error => reject(error))
      .finally(() => clearInterval(interval));
  });
};

export default api;
