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

// пустой массив для обьектов
var offers = [];

function getRandomNumberInRange(min, max) {
  return Math.round(Math.random() * (max - min + 1)) + min;
}
// берем любой элемент из массива
function getRandomElement(array) {
  // var randomNumber = Math.round(Math.random() * (array - 1));
  return array[getRandomNumberInRange(0, array.length)];
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
  var n = getRandomNumberInRange(0, FEATURES.length);
  var array = shuffle(FEATURES).slice(0, n);
  return array;
}

// создаем функцию, генерирующую массив из обьекта со случайными данными
function getAds() {
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
    // вставляем сгенерированные объекты в пустой массив
    offers.push(ad);
  }
}
// запускаем функцию для заполнения массива 8 обьектами
getAds();

// создаем фрагмент для создания пинов, обозначающих расположение созданных 8 обьектов
var fragment = document.createDocumentFragment();
// копируем шаблон пина
function makePins() {
  for (var i = 0; i < COUNT; i++) {
    var btn = document.querySelector('template > .map__pin').cloneNode(true);
    // добавляем координаты х, у и картинку в button
    btn.style.left = (offers.location.x[i] - CENTER_PIN_WIDTH) + 'px';
    btn.style.top = (offers.location.y[i] - PIN_HEIGTH) + 'px';
    btn.img.src = offers.author.avatar[i];

    fragment.appendChild(btn);
  }
}
makePins();
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

// функция, заполняющая карточку выбранного обьекта
// сейчас на основе первого по порядку элемента из сгенерированного массива
function generateAd() {
  var putIn = document.querySelector('template > .article.map__card');

  var avatar = putIn.querySelector('.popup__avatar');
  var title = putIn.querySelector('h3');
  var address = putIn.querySelector('p:first-of-type');
  var price = putIn.querySelector('.popup__price');
  var type = putIn.querySelector('h4');
  var roomsGuests = putIn('p:n-of-type(3)');
  var checkinCheckout = putIn('p:n-of-type(4)');
  var features = putIn.querySelector('ul.popup__features.li');
  var description = putIn('p:n-of-type(5)');
  var photos = putIn.querySelector('ul.popup__pictures.li');

  avatar.src = offers.author.avatar[0];
  title.textContent = offers.offer.title[0];
  address.textContent = offers.offer.address[0];
  price.textContent = offers.offer.price[0] + '&#x20bd;' + '/ночь';
  type.textContent = TYPES[offers.offer.type].ru[0];
  roomsGuests.textContent = offers.offer.rooms[0] + ' комнаты для ' + offers.offer.guests[0] + ' гостей';
  checkinCheckout.textContent = 'Заезд после ' + offers.offer.checkin[0] + ', выезд до ' + offers.offer.checkout[0];
  features.textContent = offers.features[0];
  description.textContent = offers.offer.description[0];
  photos.src = offers.offer.photos[0];

}
generateAd();

var mapFilters = map.querySelector('.map__filters-container');
map.insertBefore(generateAd(), mapFilters);
