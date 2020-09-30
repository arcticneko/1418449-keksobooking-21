'use strict';
/* {
  "author": {
      "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },
  "offer": {
      "title": строка, заголовок предложения
      "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      "price": число, стоимость
      "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
      "rooms": число, количество комнат
      "guests": число, количество гостей, которое можно разместить
      "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      "description": строка с описанием,
      "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  },
  "location": {
      "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      "y": случайное число, координата y метки на карте от 130 до 630.
  }
}  */
const AVATAR = [{avatar: `img/avatars/user01.png`}, {avatar: `img/avatars/user02.png`}, {avatar: `img/avatars/user03.png`}, {avatar: `img/avatars/user04.png`}, {avatar: `img/avatars/user05.png`}, {avatar: `img/avatars/user06.png`}, {avatar: `img/avatars/user07.png`}, {avatar: `img/avatars/user08.png`}];
const TYPE = [{type: `palace`}, {type: `flat`}, {type: `house`}, {type: `bungalow`}];
const CHECKIN = [{checkin: `12:00`}, {checkin: `13:00`}, {checkin: `14:00`}];
const CHECKOUT = [{checkout: `12:00`}, {checkout: `13:00`}, {checkout: `14:00`}];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

let getRandomNumber = function (min, max) {
  return Math.round(((Math.random() * (max - min)) + min));
};

let getPhotoset = function (photos = 5) {
  let photoSet = [];
  for (let j = 0; j < getRandomNumber(1, photos); j++) {
    /* let photo = `http://o0.github.io/assets/images/tokyo/hotel${j}.jpg`;
    photoSet.push(photo); */
    photoSet.push(`http://o0.github.io/assets/images/tokyo/hotel${j}.jpg`);
  }
  return photoSet;
};

let getData = function () {
  let adDataStorage = [];
  for (let i = 0; i < 8; i++) {
    let adData = {
      "author": {
        "avatar": AVATAR[i].avatar,
      },
      "offer": {
        "title": `Заголовок предложения ${i + 1}`,
        "address": `${getRandomNumber(0, 600)}, ${getRandomNumber(0, 350)}`,
        "price": `${getRandomNumber(1000, 5000)}`,
        "type": TYPE[getRandomNumber(0, 3)],
        "rooms": getRandomNumber(1, 3),
        "guests": getRandomNumber(1, 4),
        "checkin": CHECKIN[getRandomNumber(0, 2)],
        "checkout": CHECKOUT[getRandomNumber(0, 2)],
        "features": FEATURES.slice(0, getRandomNumber(1, 5)),
        "description": `Строка с описанием ${i}`,
        "photos": getPhotoset(),
      },
      "location": {
        "x": getRandomNumber(130, 1200),
        "y": getRandomNumber(130, 630),
      }
    };
    adDataStorage.push(adData);
  }
  return adDataStorage;
};

/* <template id="pin">
<button type="button" class="map__pin" style="left: 200px; top: 400px;">
  <img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления">
</button>
</template>


Координаты: style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"
У изображения метки укажите:
Аватар: src="{{author.avatar}}"
Альтернативный текст: alt="{{заголовок объявления}}"


Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.
*/


let renderPins = function () {
  let map = document.querySelector(`.map`);
  let templatePinButton = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let poolPins = document.querySelector(`.map__pins`);
  let fragment = document.createDocumentFragment();
  map.classList.remove(`map--faded`);
  let dataSource = getData();
  for (let i = 0; i < 8; i++) {
    let newPin = templatePinButton.cloneNode(true);
    newPin.style.left = (dataSource[i].location.x - 20) + `px`;
    newPin.style.top = (dataSource[i].location.y - 40) + `px`;
    let avatarImg = newPin.querySelector(`img`);
    avatarImg.src = dataSource[i].author.avatar;
    avatarImg.alt = dataSource[i].offer.title;
    fragment.appendChild(newPin);
    /* console.log(newPin); */
  }
  return poolPins.appendChild(fragment);
};

renderPins();
