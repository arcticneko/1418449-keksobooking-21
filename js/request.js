'use strict';

let URL_LOAD_ADDRESS = `https://21.javascript.pages.academy/keksobooking/data`;
let URL_UPLOAD_ADDRESS = `https://21.javascript.pages.academy/keksobooking`;

let data = [];

let getData = function () {
  return data;
};

let getServerData = function (url, onSuccsessCallback, onErrorCallback) {

  const WRONG_REQUEST_CODE = 400;
  const NOT_AUTHORIZED_CODE = 401;
  const NOT_FOUND_CODE = 404;
  let error;

  return fetch(url)
    .then(function (response) {
      if (response.status >= 400) {
        switch (response.status) {
          case WRONG_REQUEST_CODE:
            error = `Неверный запрос`;
            break;
          case NOT_AUTHORIZED_CODE:
            error = `Пользователь не авторизован`;
            break;
          case NOT_FOUND_CODE:
            error = `Ничего не найдено`;
            break;

          default:
            error = `Cтатус ответа: : ` + response.status + ` ` + response.statusText;
        }

        return onErrorCallback(error);
      }

      return response.json()
        .then(function (forClientData) {
          data = forClientData.filter((item) => item.offer); // оставляем только те что содержат item.offer
          onSuccsessCallback(data);
        });
    });
};

let uploadData = function (url, onSuccessCallback, onErrorCallback, clientData) { // data это то что передаем на сервер, см. ниже
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    const SUCCESS_CODE = 200;
    const WRONG_REQUEST_CODE = 400;
    const NOT_AUTHORIZED_CODE = 401;
    const NOT_FOUND_CODE = 404;
    let error;

    switch (xhr.status) {
      case SUCCESS_CODE:
        onSuccessCallback();
        break;
      case WRONG_REQUEST_CODE:
        error = `Неверный запрос`;
        break;
      case NOT_AUTHORIZED_CODE:
        error = `Пользователь не авторизован`;
        break;
      case NOT_FOUND_CODE:
        error = `Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }

    if (error) {
      onErrorCallback(error);
    }
  });

  xhr.addEventListener(`error`, function () {
    onErrorCallback(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, function () {
    onErrorCallback(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = 10000;

  xhr.open(`POST`, url);
  xhr.send(clientData); // отправка данных data на сервер
};


window.request = {
  URL_LOAD_ADDRESS,
  URL_UPLOAD_ADDRESS,
  getServerData,
  getData,
  uploadData,
};
