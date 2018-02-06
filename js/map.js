'use strict';

document.querySelector('.map').classList.remove('map--faded');


var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира',
'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher','parking', 'washer', 'elevator', 'conditioner'];
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
  shuffle(features);
  var n = getRandomNumberInRange(0, array.length)
  for (var i = 0; i <= n; i++) {
    array[i] = array[getRandomElement(array.length)]
  }
  return array;
}
// функция, генерирующая 8 объектов с заданными свойствами
var getAds = function() {
for (var i = 1; i <= 8; i++) {
  author: {
    avatar: shuffle(avatars)
  }
  offer: {
    title: shuffle(TITLE)[i]
    address: x + ',' + y
    price: getRandomNumberInRange(1000, 1000000)
    type: getRandomElement(TYPE.length)
    rooms: getRandomElement(ROOMS.length)
    guests: getRandomNumberInRange(1, 10)
    checkin: getRandomElement(checkin.length)
    checkout: getRandomElement(checkout.length)
    features: getFeatures(features)
    description:''
    photos: shuffle(photos)
  }
  location:{
     x: x
     y: y
  }
}
return getAds;
}


document.querySelector('template').querySelector('.button').style.fill = 'left: ' + x+ 'px; top: ' + y + 'px;';
document.querySelector('template').querySelector('.button').querySelector('.src').style.fill = author.avatar;
getOfferType = function(type) {
if (offer.type === 'flat') {
  var offerTypeSelect = 'Квартира'
} else {
  if (offer.type === 'bungalo') {
    offerTypeSelect = 'Бунгало'
  } else {
    if (offer.type === 'house') {
      offerTypeSelect = 'Дом'
    }
  }
}
}

var map__cardTemplate = document.querySelector('template').content.querySelector('article.map__card')

map__cardTemplate.querySelector('h3').textContent = offer.title;
map__cardTemplate.querySelector('p').textContent = offer.address;
map__cardTemplate.querySelector('.popup__price').querySelector('p:nth-child(2)').textContent = '' + offer.price + '&#x20bd;' + '/ночь';
map__cardTemplate.querySelector('h4').textContent= getOfferType(offer.type);
map__cardTemplate.querySelector('.popup__price').content.querySelector('p:nth-child(3)') = offer.rooms + 'комнаты для ' + offer.guests + 'гостей';
map__cardTemplate.querySelector('.popup__price').content.querySelector('p:nth-child(4)') = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
map__cardTemplate.querySelector('popup__features').querySelector('feature').textContent = features;
map__cardTemplate.querySelector('.popup__price').content.querySelector('p:nth-child(5)') = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
map__cardTemplate.querySelector('.popup__price').content.querySelector('p:nth-child(6)') = offer.description;
map__cardTemplate.querySelector('.popup__pictures').textContent = offer.photos; // Для фотографий нужно явно указать размеры в атрибутах.
map__cardTemplate.querySelector('.img').classList.remove('.src') = author.avatar;
