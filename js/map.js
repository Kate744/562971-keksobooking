'use strict';

(function() {
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

  // Определение типа жилья для русификации
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

    var fieldsets = form.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  };

  startPin.addEventListener('mouseup', function () {
    mouseupOnStartPin();
    getAddress();
  });

})();
