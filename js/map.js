'use strict';

var PIN_WIDTH = 40;
var CENTER_PIN_HEIGHT = 40 / 2;
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATARS = ['img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'];
var COUNT = 8;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


var map = document.querySelector('.map');
// пустой массив для обьектов
var offers = [];

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// берем любой элемент из массива
function getRandomElement(array) {
  // var randomNumber = Math.round(Math.random() * (array - 1));
  return array[getRandomNumberInRange(0, array.length - 1)];
}

// перемешиваем массив
function shuffle(array) {
  var currentIndex = array.length;
  while (currentIndex !== 0) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= currentIndex;
    var temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


// рандомное  кол-во опций в номере и их значения
function getFeatures() {
  var n = getRandomNumberInRange(0, FEATURES.length - 1);
  var array = shuffle(FEATURES).slice(0, n);
  return array;
}

// создаем функцию, генерирующую массив из обьектов со случайными данными
function getDataAds() {
  var mixTitles = shuffle(TITLE);
  var mixAvatars = shuffle(AVATARS);

  for (var i = 0; i < COUNT; i++) {
    var x = getRandomNumberInRange(300, 900);
    var y = getRandomNumberInRange(150, 500);
    var ad = {
      author: {
        avatar: mixAvatars[i]
      },
      offer: {
        title: mixTitles[i],
        address: x + ', ' + y,
        price: getRandomNumberInRange(1000, 1000000),
        type: getRandomElement(TYPE),
        rooms: getRandomElement(ROOMS),
        guests: getRandomNumberInRange(1, 10),
        checkin: getRandomElement(CHECKIN),
        checkout: getRandomElement(CHECKOUT),
        features: getFeatures(),
        description: '',
        photos: shuffle(PHOTOS)
      },
      location: {
        x: x,
        y: y
      }
    };
    // вставляем сгенерированные объекты в пустой массив
    offers.push(ad);
  }
}
// запускаем функцию для заполнения массива 8 обьектами
getDataAds();

// создаем фрагмент для создания пинов, обозначающих расположение созданных 8 обьектов
var fragment = document.createDocumentFragment();
// копируем шаблон пина
function makePins() {
  for (var i = 0; i < COUNT; i++) {
    var templateElement = document.querySelector('template').content;
    var btn = templateElement.querySelector('.map__pin').cloneNode(true);
    var image = btn.querySelector('img');
    var data = offers[i];
    // добавляем координаты х, у и картинку в button
    btn.style.left = (data.location.x - PIN_WIDTH) + 'px';
    btn.style.top = (data.location.y - CENTER_PIN_HEIGHT) + 'px';
    image.src = data.author.avatar;

    btn.addEventListener('click', function () {
      generateCard(data);
    });

    fragment.appendChild(btn);
  }
}

makePins();
var putMapPins = document.querySelector('.map__pins');
// putMapPins.appendChild(fragment);

// Определение типа жилья для русификации слов
var TYPES = {
  flat: {
    ru: 'Квартира'
  },
  bungalo: {
    ru: 'Бунгало'
  },
  house: {
    ru: 'Дом'
  }
};

function addFeatures(el, data) {
  el.innerHTML = '';
  data.forEach(function (item) {
    var li = document.createElement('li');
    li.classList.add('feature');
    li.classList.add('feature--' + item);
    el.appendChild(li);
  });
}
function addPhotos(el, data) {
  el.innerHTML = '';
  data.forEach(function (item) {
    var li = document.createElement('li');
    var picture = document.createElement('img');
    picture.src = item;
    picture.width = 70;
    picture.height = 70;
    el.appendChild(li);
    el.appendChild(picture);
  });
}
// функция, заполняющая карточку выбранного обьекта
// сейчас на основе первого по порядку элемента из сгенерированного массива


function generateCard(data) {
  var templateElement = document.querySelector('template').content;
  var putIn = templateElement.querySelector('.popup').cloneNode(true);
  var pElements = putIn.querySelectorAll('p');

  var avatar = putIn.querySelector('.popup__avatar');
  var title = putIn.querySelector('h3');
  var address = pElements[0];
  var price = putIn.querySelector('.popup__price');
  var type = putIn.querySelector('h4');
  var roomsGuests = pElements[2];
  var checkinCheckout = pElements[3];
  var features = putIn.querySelector('ul.popup__features');
  var description = pElements[4];
  var photos = putIn.querySelector('ul.popup__pictures');

  avatar.src = data.author.avatar;
  title.textContent = data.offer.title;
  address.textContent = data.offer.address;
  price.textContent = data.offer.price + ' ₽/ночь';
  type.textContent = TYPES[data.offer.type].ru;
  roomsGuests.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  checkinCheckout.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  addFeatures(features, data.offer.features);
  description.textContent = data.offer.description;
  addPhotos(photos, data.offer.photos);

  map.insertBefore(putIn, mapFilters);
}

var mapFilters = map.querySelector('.map__filters-container');


// Задание по событиям

map.classList.add('map--faded');
// отключаем активность у полей
// для начального экрана

var form = document.querySelector('.notice__form');
form.classList.add('notice__form--disabled');

// ищем стартовый пин
var startPin = document.querySelector('.map__pin--main');

function mouseupOnStartPin() {
  map.classList.remove('map--faded');
  startPin.removeAttribute('disabled');
  form.classList.remove('notice__form--disabled');
  putMapPins.appendChild(fragment);
  // generateCard(offers[3]);
  var fieldsets = form.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
}
startPin.addEventListener('mouseup', function () {
  mouseupOnStartPin();
  getAddress();
});

// ищем поле адреса и заполняем его по умолчанию
var notice = document.querySelector('.notice__form');
notice.querySelector('#address');
function getAddress() {

}


// закрыть карточку кликом или клавишей
var findCardClose = document.querySelector('.popup__close');
findCardClose.addEventListener('click', closeCard);

function closeCard() {
  findCardClose.setAttribute('disabled', 'disabled');
  document.addEventListener('keydown', onCardClose);
}
function onCardClose(evt) {
  if (findCardClose === document.activeElement) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeCard();
    }
  } else {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  }
}
