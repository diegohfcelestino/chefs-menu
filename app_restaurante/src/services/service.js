import { errorMessage } from "../components/toast/Toast";
import api from "./api";
import { handleError } from "./helpers";
import { handleGetAsyncStorage } from "./storage";

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


export async function getGeral() {
  try {
    const { accessToken } = await handleGetAsyncStorage();
    if (accessToken !== null) {
      const dadosUser = JSON.parse(auth);

      const params = {
        // empresa: dadosUser?.empresa,
        nomeUsuario: dadosUser.nomeUsuario,
        skip: 0,
        take: 1000
      };

      const token = dadosUser?.accessToken;

      const urlComplete = `/rota?${qs.stringify(params)}`;

      let config = {
        method: "get",
        url: urlComplete,
      };
      return new Promise((resolve, reject) => {
        api(config, token)
          .then((res) => {
            const data = res.data;
            resolve({
              data,
            });
          })
          .catch(err => {
            reject(err);
          });
      });
    } else {
      errorMessage("Erro ao fazer requisição");
    }
  } catch (error) {
    console.log("erro ao pegar dados da empresa no storage", error);
  }
}