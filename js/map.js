'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var CENTER_PIN_WIDTH = 40 / 2;
var PIN_HEIGTH = 44;
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

// пустой массив обьектов
var offers = [];

var getRandomNumberInRange = function (min, max) {
  return Math.round(Math.random() * (max - min + 1)) + min;
};
// берем любой элемент из массива
var getRandomElement = function (array) {
  // var randomNumber = Math.round(Math.random() * (array - 1));
  return array[getRandomNumberInRange(0, array.length)];
};

// перемешиваем массив
var shuffle = function (array) {
  var currentIndex = array.length;
  while (currentIndex !== 0) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= currentIndex;
    var temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};


// рандомное  кол-во опций в номере и их значения
function getFeatures() {
  var n = getRandomNumberInRange(0, FEATURES.length);
  var array = shuffle(FEATURES).slice(0, n);
  return array;
}

// создаем функцию, генерирующую массив из обьекта со случайными данными
var getAds = function () {
  var mixTitles = shuffle(TITLE);
  var mixAvatars = shuffle(AVATARS);
  for (var i = 0; i < COUNT; i++) {
    var x = getRandomNumberInRange(300, 900);
    var y = getRandomNumberInRange(150, 500);
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + getRandomElement(mixAvatars) + '.png'
      },
      offer: {
        title: mixTitles[i],
        address: x + ',' + y,
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
    // вставляем сгенерированный объект в пустой массив
    offers.push(ad);
  }
  // и возвращаем его
  return offers;
};

// создаем фрагмент
var fragment = document.createDocumentFragment();
// копируем шаблон кнопки
var makePins = function () {
  for (var i = 0; i < COUNT; i++) {
    var btn = document.querySelector('template').querySelector('.map__pin').cloneNode(true);
    // добавляем координаты х, у и картинку в button
    btn.style.left = (getAds.location.x - CENTER_PIN_WIDTH) + 'px';
    btn.style.top = (getAds.location.y - PIN_HEIGTH) + 'px';
    btn.img.src = getAds.author.avatar;
  }
  fragment.appendChild(btn);
  return makePins;
};

var putMapPins = document.querySelector('.map__pins');
putMapPins.appendChild(fragment);

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

function generateAd() {
  var putIn = document.querySelector('template').content.querySelector('.article.map__card');
  // var pElements = putIn.querySelectorAll('p');

  var title = putIn.querySelector('h3');
  var address = putIn.querySelector('p:first-of-type');
  var price = putIn.querySelector('.popup__price');
  var type = putIn.querySelector('h4');
  var roomsGuests = putIn('p:n-of-type(3)');
  var checkinCheckout = putIn('p:n-of-type(4)');
  var features = putIn.querySelector('ul.popup__features');
  var description = putIn('p:n-of-type(5)');
  var photos = putIn.querySelector('ul.popup__pictures');

  title.textContent = offers.offer.title;
  address.textContent = offers.offer.address;
  price.textContent = offers.offer.price + '&#x20bd;' + '/ночь';
  type.textContent = TYPES[offers.offer.type].ru;
  roomsGuests.textContent = offers.offer.rooms + ' комнаты для ' + offers.offer.guests + ' гостей';
  checkinCheckout.textContent = 'Заезд после ' + offers.offer.checkin + ', выезд до ' + offers.offer.checkout;
  features.textContent = offers.features;
  description.textContent = offers.offer.description;
  photos.src = offers.author.avatar;

  return putIn;
}

var mapFilters = map.querySelector('.map__filters-container');
map.insertBefore(generateAd(), mapFilters);
