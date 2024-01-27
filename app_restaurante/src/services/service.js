import { errorMessage } from "../components/toast/Toast";
import api from "./api";
import { handleError } from "./helpers";
import { handleGetAsyncStorage } from "./storage";
import qs from "qs";

export async function handlePost(url, params = {}) {
  try {
    let config = {
      method: "post",
      data: params,
      url: url,
    };

    return new Promise((resolve, reject) => {
      api(config)
        .then((res) => {
          const data = res.data;
          resolve({
            data,
          });
        })
        .catch((error) => {
          reject(handleError(error, "Erro"));
        });
    });

  } catch (error) {
    console.log("erro ao pegar dados do usuario no storage", error);
  }
}


export async function handleGetDefault(url) {
  try {
    const { accessToken } = await handleGetAsyncStorage();
    if (accessToken !== null) {

      let config = {
        method: "get",
        url: url,
      };

      return new Promise((resolve, reject) => {
        api(config, accessToken)
          .then((res) => {
            const data = res.data;
            resolve({
              data,
            });
          })
          .catch(error => {
            reject(handleError(error, "Erro"));
          });
      });
    } else {
      errorMessage("Erro ao fazer requisição");
    }
  } catch (error) {
    console.log("erro ao pegar dados da empresa no storage", error);
  }
}
export async function handleGetWithParams(url, params) {
  console.log("param", params);
  try {
    const { accessToken } = await handleGetAsyncStorage();
    if (accessToken !== null) {


      const urlComplete = `${url + params}`;

      console.log("url", urlComplete);

      let config = {
        method: "get",
        url: urlComplete,
      };
      return new Promise((resolve, reject) => {
        api(config, accessToken)
          .then((res) => {
            const data = res.data;
            resolve({
              data,
            });
          })
          .catch(error => {
            reject(handleError(error, "Erro"));
          });
      });
    } else {
      errorMessage("Erro ao fazer requisição");
    }
  } catch (error) {
    console.log("erro ao pegar dados da empresa no storage", error);
  }
}