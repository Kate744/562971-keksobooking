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
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATARS = ['img/avatars/user01.png',
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
var getRandomElement = function (array) {
  // var randomNumber = Math.round(Math.random() * (array - 1));
  return array[getRandomNumberInRange(0, array.length)];
};

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
function getFeatures() {
  var n = getRandomNumberInRange(0, FEATURES.length);
  var array = shuffle(FEATURES).slice(0, n);
return array;
}


var getAds = function() {
var offers = [];
var mixTitles = shuffle(TITLE);
var mixAvatars = shuffle(AVATARS);
for (var i = 0; i < 8; i++) {
    var x = getRandomNumberInRange(300, 900)
    var y = getRandomNumberInRange(150, 500)
  var ad = {
     author: {
     avatar: 'img/avatars/user0' + getRandomElement (mixAvatars) + '.png'
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
     description:'',
     photos: shuffle(photos)
   },
   location: {
     x: x,
     y: y
   }
 }
  offers.push(ad);
}
return offers;
}

var fragment = document.createDocumentFragment();
  var makePins = function () {
    for (var i = 0; i < 8; i++) {
      var btn = template.querySelector('button').cloneNode(true);
      var pic = template.querySelector('img').cloneNode(true);
      // добавляем х, у и картинку в button
      btn.style.left = (ad.offer.location.x - CENTER_PIN_WIDTH) + 'px';
      btn.style.top = (ad.offer.location.y - PIN_HEIGTH) + 'px';
      pic.src = ad.author.avatar;
    }
    fragment.appendChild(btn);
   	return btn;
  };

  map__pins.appendChild(fragment);

var map__cardTemplate = document.querySelector('template').content.querySelector('article.map__card')



function generateAd() {
  function typeOfApt(ad) {
    switch(offer.type) {
    case 'flat':
      var offerTypeSelect = 'Квартира'
      break

    case 'bungalo':  // if (x === 'value2')
    var offerTypeSelect = 'Бунгало'
      break

    case 'house':
      var offerTypeSelect = 'Дом'
      break
  }
  }

  var putIn = document.querySelector('template').content.querySelector('.article.map__card');

  var title = putIn.querySelector('h3')
  var address = putIn.querySelector('p:first-of-type')
  var price = putIn.querySelector('.popup__price')
  var type = putIn.querySelector('h4')
  var roomsGuests = putIn.querySelector('p:nth-of-type(3)')
  var checkinCheckout = putIn.querySelector('p:nth-of-type(4)')
  var features = putIn.querySelector('ul.popup__features')
  var description = putIn.querySelector('p:nth-of-type(5)')
  var photo = putIn.querySelector('ul.popup__pictures')

  title.textContent = ad.offer.title
  address.textContent = ad.offer.address
  price.textContent = ad.offer.price + '&#x20bd;' + '/ночь';
  type.textContent = typeOfApt(ad.offer.type);
  roomsGuests.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  checkinCheckout.textContent = 'Заезд после ' + add.offer.checkin + ', выезд до ' + offer.checkout;
  description.textContent = add.offer.description;
  img.src = author.avatar

  return putIn;
}



  map.insertBefore(putIn, .map__filters-container)
