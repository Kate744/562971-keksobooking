'use strict';

document.querySelector('.map').classList.remove('map--faded');

var CENTER_PIN_WIDTH = 40 / 2;
var PIN_HEIGTH = 44;
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира',
'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher','parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var avatars = ['img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png']

var getRandomNumberInRange = function(min, max) {
return Math.round(Math.random() * (max - min + 1)) + min;
}
// берем любой элемент из массива
var getRandomElement = function (x) {
  var randomNumber = Math.round(Math.random() * (x - 1));
  return randomNumber;
};

var x = getRandomNumberInRange(300, 900);
var y = getRandomNumberInRange(150, 500);

// перемешиваем массив
function shuffle(array) {
  var currentIndex = array.length
  while (0 !== currentIndex) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    var currentIndex = currentIndex - 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// рандомное  кол-во опций в номере и их значения
function getFeatures(array) {
  shuffle(FEATURES);
  var n = getRandomNumberInRange(0, FEATURES.length)
  for (var i = 0; i <= n; i++) {
    array[i] = array[getRandomElement(FEATURES.length)]
  }
  return FEATURES;
}
 // создаем один обьект обьявления
  var ad = {
    author: {
    avatar: shuffle(avatars)
  },
  offer: {
    title: shuffle(TITLE)[i],
    address: x + ',' + y,
    price: getRandomNumberInRange(1000, 1000000),
    type: getRandomElement(TYPE.length),
    rooms: getRandomElement(ROOMS.length),
    guests: getRandomNumberInRange(1, 10),
    checkin: getRandomElement(CHECKIN.length),
    checkout: getRandomElement(CHECKOUT.length),
    features: getFeatures(FEATURES),
    description:'',
    photos: shuffle(photos)
  },
  location:{
     x: x,
     y: y
  }
}
// создаем фрагмент
var fragment = document.createDocumentFragment();
var findButton = document.querySelector('template').querySelector('.button');
var map__cardTemplate = document.querySelector('template').content.querySelector('article.map__card')
// создам 8 обьектов обьявлений по примеру выше
for (var i = 1; i <= 8; i++) {
  var ad = document.createElement(ad);
  findButton.style.left = (x - CENTER_PIN_WIDTH) + 'px';
  findButton.style.top = (y - PIN_HEIGTH) + 'px';
  findButton.querySelector('img').style.src = author.avatar;



  // вставить все во фрагмент
  fragment.appendChild(list[i]);
}

switch(offer.type) {
  case 'flat':
    var offerTypeSelect = 'Квартира'
    break

  case 'bungalo':  // if (x === 'value2')
  var offerTypeSelect = 'Бунгало'
    break

  default:
    var offerTypeSelect = 'Дом'
    break
}

// вставить все в размерку, указав, куда именно
map__pins.appendChild(fragment);

for (var i = 1; i <= 8; i++) {
  map__cardTemplate.querySelector('h3').textContent = offer.title;
  map__cardTemplate.querySelector('p').textContent = offer.address;
  map__cardTemplate.querySelector('.popup__price').textContent = offer.price + '&#x20bd;' + '/ночь';
  map__cardTemplate.querySelector('h4').textContent= getOfferType(offer.type);
  map__cardTemplate.querySelector('.popup__price').content.querySelector('p:nth-child(3)') = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  map__cardTemplate.querySelector('.popup__price').content.querySelector('p:nth-child(4)') = 'Заезд после ' + offer.CHECKIN + ', выезд до ' + offer.CHECKOUT;
  map__cardTemplate.querySelector('popup__features').textContent = FEATURES;
  map__cardTemplate.querySelector('.popup__price').content.querySelector('p:nth-child(5)') = offer.description;
  map__cardTemplate.querySelector('.popup__pictures').textContent = offer.photos; // Для фотографий нужно явно указать размеры в атрибутах.
  map__cardTemplate.querySelector('.img').classList.remove('.src') = author.avatar;
  map.insertBefore(elem, .map__filters-container);
}
