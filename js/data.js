'use strict';

(function () {
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


  // пустой массив для обьектов
  var offers = [];
  var getRandomNumberInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  // берем любой элемент из массива
  var getRandomElement = function (array) {
    return array[getRandomNumberInRange(0, array.length - 1)];
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
  var getFeatures = function () {
    var n = getRandomNumberInRange(0, FEATURES.length - 1);
    var array = shuffle(FEATURES).slice(0, n);
    return array;
  };

  // создаем функцию, генерирующую массив из обьектов со случайными данными
  window.getDataAds = function (index) {
    var mixTitles = shuffle(TITLE);
    var mixAvatars = shuffle(AVATARS);

    for (var i = 0; i < window.globalVars.COUNT; i++) {
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
    return index >= 0 ? offers[index] : offers;
  };
})();
