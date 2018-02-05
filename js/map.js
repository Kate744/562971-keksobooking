'use strict';

var title = ['Большая уютная квартира', 'Маленькая неуютная квартира',
'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher','parking', 'washer', 'elevator', 'conditioner'];
var description = '';
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


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

for (var i = 1; i <= 8; i++) {
  author: {
    avatar: ['img/avatars/user{0'+getRandomNumberInRange(1, 8)+'}.png']
  }
  offer: {
    title: getRandomElement(title.length) // Значения не должны повторяться!! У меня могут
    address: x + ',' + y
    price: getRandomNumberInRange(1000, 1000000)
    type: getRandomElement(type.length)
    rooms: getRandomElement(rooms.length)
    guests: getRandomNumberInRange(1, 10)
    checkin: getRandomElement(checkin.length)
    checkout: getRandomElement(checkout.length)
    features: // не знаю пока, как сделать цикл, чтобы не повторялись выбранные значения!!!!!!
    description:''
    photos: mixPhotos()
  },
  location:{
     x: x
     y: y
  }
}
// Цикл, который исключает повторение индексов в массиве (для разное последовательности)
// корявый какой-то, да?
// его потом выводить куда-то надо?
// пока поставила сразу в photos: mixPhotos()
var mixPhotos = function () {
  for (var i = 1; i < photos.length; i++){
  photos[i] = getRandomNumberInRange(1, 3);
  if (photos[i+1] === photos[i]) {
    photos[i+1] = getRandomNumberInRange(1, 3);
  }
  }
}




document.querySelector('.map').classList.remove('map--faded');
