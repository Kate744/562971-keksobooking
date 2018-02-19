'use strict';

var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
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
var INITIAL_POSITON_X = (900 - 300) / 2;
var INITIAL_POSITION_Y = (500 - 150) / 2;

var map = document.querySelector('.map');

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
var getDataAds = function () {
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
};
// запускаем функцию для заполнения массива 8 обьектами
getDataAds();

// создаем фрагмент для создания пинов, обозначающих расположение созданных 8 обьектов
var fragment = document.createDocumentFragment();
// копируем шаблон пина
var makePins = function () {
  for (var i = 0; i < COUNT; i++) {
    var templateElement = document.querySelector('template').content;
    var btn = templateElement.querySelector('.map__pin').cloneNode(true);
    var image = btn.querySelector('img');
    var data = offers[i];
    // добавляем координаты х, у и картинку в button
    btn.style.left = (data.location.x - PIN_WIDTH) + 'px';
    btn.style.top = (data.location.y + PIN_HEIGHT) + 'px';
    image.src = data.author.avatar;
    btn.tabIndex = i;

    fragment.appendChild(btn);
  }
};

var putMapPins = document.querySelector('.map__pins');

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

var addFeatures = function (el, data) {
  el.innerHTML = '';
  data.forEach(function (item) {
    var li = document.createElement('li');
    li.classList.add('feature');
    li.classList.add('feature--' + item);
    el.appendChild(li);
  });
};
var addPhotos = function (el, data) {
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
};

// функция, заполняющая карточку выбранного обьекта
var onCloseClick = function () {
  var popup = map.querySelector('.popup');
  map.removeChild(popup);
};

var onCloseKeyUp = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    var popup = map.querySelector('.popup');
    map.removeChild(popup);
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    var popup = map.querySelector('.popup');
    map.removeChild(popup);
  }
};
// выбор features натабыванием с клавиатуры
var featActive = document.querySelector('.features');
var onFeaturesEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    featActive.classList.add('input:checked');
  }
};
featActive.addEventListener('keyup', onFeaturesEnterPress);

var generateCard = function (data) {
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

  var btnClose = putIn.querySelector('.popup__close');
  // к каждой открытой карточке с данными привязываем обработчики событий
  btnClose.addEventListener('click', onCloseClick);
  btnClose.addEventListener('keyup', onCloseKeyUp);
  document.addEventListener('keyup', onPopupEscPress);
  map.insertBefore(putIn, mapFilters);
};
var mapFilters = map.querySelector('.map__filters-container');

map.classList.add('map--faded');
// отключаем активность у полей
// для начального экрана

var form = document.querySelector('.notice__form');
form.classList.add('notice__form--disabled');

// ищем стартовый пин
var startPin = document.querySelector('.map__pin--main');

var mouseupOnStartPin = function () {
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  makePins();
  putMapPins.appendChild(fragment);

  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

  [].forEach.call(pins, function (item, index) {
    item.addEventListener('click', function () {
      var popup = map.querySelector('.popup');
      if (popup !== null) {
        map.removeChild(popup);
      }
      generateCard(offers[index]);
    });
  });

  getAddress();

  var fieldsets = form.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
};

startPin.addEventListener('mouseup', function () {
  mouseupOnStartPin();
  getAddress();
});

// ищем поле адреса и заполняем его по умолчанию
var address = document.querySelector('#address');
var getAddress = function () {
  address.placeholder = (INITIAL_POSITON_X + PIN_WIDTH / 2) + ', ' + (INITIAL_POSITION_Y + PIN_HEIGHT);
};

// ВАЛИДАЦИЯ ФОРМ

// найдем форму заголовка и цены в разметке
var findFormElement = document.querySelector('.notice');
var type = findFormElement.querySelector('#type');
var price = findFormElement.querySelector('#price');
var title = findFormElement.querySelector('#title');

// функция проверки заполненности поля заголовка
var checkTitle = function () {
  if (title.validity.tooShort) {
    title.setCustomValidity('Заголовок слишком короткий (менее 30 символов)');
  } else if (title.validity.tooLong) {
    title.setCustomValidity('Заголовок слишком длинный (более 100 символов)');
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Пожалуйста, укажите заголовок объявления');
  } else {
    title.setCustomValidity('');
  }
};

// задать миним цену в зависимости от типа жилья
// строки 290- 298 данные для двух функций
// validationPrice и checkPrice
var typePrice = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};
var value = type.value;
var minPrice = typePrice[value];
var validationPrice = function () {
  // цена в сутки в зависимости от типа жилья
  price.setAttribute('min', minPrice);
  price.setAttribute('placeholder', 'от ' + minPrice);
};
validationPrice();
// проверка заполненности поля цены
var checkPrice = function () {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity('Минимальная цена' + minPrice + ' рублей');
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Цена не может быть больше 1 000 000 рублей');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Пожалуйста, укажите цену');
  } else {
    price.setCustomValidity('');
  }
};

type.addEventListener('click', validationPrice);

// время заезда и выезда одинаковы
var timeIn = findFormElement.querySelector('#timein');
var timeOut = findFormElement.querySelector('#timeout');

var equalTime = function (one, two) {
  two.value = one.value;
};
timeIn.addEventListener('click', function () {
  equalTime(timeIn, timeOut);
});
timeOut.addEventListener('click', function () {
  equalTime(timeOut, timeIn);
});

// кол-во комнат в зависимости от кол-ва гостей
var roomNumber = findFormElement.querySelector('#room_number');
var peopleNumber = findFormElement.querySelector('#capacity');

/* var people = {
  1: 'для 1 гостя',
  2: 'для 2 гостей',
  3: 'для 3 гостей',
  0: 'не для гостей'
}
var rooms = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
*/

var calculateRooms = function () {
  var countOfRooms = roomNumber.value;
  // var options = rooms[countOfRooms];
  var optElem = peopleNumber.querySelectorAll('option');
  var guests1 = optElem[2];
  var guests2 = optElem[1];
  var guests3 = optElem[0];
  var guestsNo = optElem[3];
  var deleteSelected = function () {
    document.removeAttribute('selected');
  };
  if (countOfRooms === '1') {
    guests2.setAttribute('disabled', 'disabled');
    guests3.setAttribute('disabled', 'disabled');
    guestsNo.setAttribute('disabled', 'disabled');
    optElem.forEach(deleteSelected);
    guests1.setAttribute('selected');
  } else if (countOfRooms === '2') {
    guests3.setAttribute('disabled', 'disabled');
    guestsNo.setAttribute('disabled', 'disabled');
    optElem.forEach(deleteSelected);
    guests1.setAttribute('selected');
  } else if (countOfRooms === '3') {
    guestsNo.setAttribute('disabled', 'disabled');
    optElem.forEach(deleteSelected);
    guests1.setAttribute('selected');
  } else {
    guests2.setAttribute('disabled', 'disabled');
    guests3.setAttribute('disabled', 'disabled');
    guests1.setAttribute('disabled', 'disabled');
    optElem.forEach(deleteSelected);
    guests1.setAttribute('selected');
  }
};
roomNumber.addEventListener('click', calculateRooms);
var inputError = [];
form.addEventListener('invalid', function (evt) {
  checkPrice();
  checkTitle();
  evt.target.style.borderColor = '#ff2400';
  inputError.push(evt.target);
}, true);
