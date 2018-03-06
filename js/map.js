'use strict';

(function () {
  // создаем фрагмент для создания пинов, обозначающих расположение созданных 8 обьектов
  var fragment = document.createDocumentFragment();
  // копируем шаблон пина
  var makePins = function () {
    for (var i = 0; i < window.globalVars.COUNT; i++) {
      var templateElement = document.querySelector('template').content;
      var btn = templateElement.querySelector('.map__pin').cloneNode(true);
      var image = btn.querySelector('img');

      var data = window.getDataAds(i);
      // добавляем координаты х, у и картинку в button
      btn.style.left = (data.location.x - window.globalVars.PIN_WIDTH) + 'px';
      btn.style.top = (data.location.y + window.globalVars.PIN_HEIGHT) + 'px';
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
    var popup = window.globalVars.map.querySelector('.popup');
    window.globalVars.map.removeChild(popup);
  };

  var onCloseKeyUp = function (evt) {
    if (evt.keyCode === window.globalVars.ENTER_KEYCODE) {
      var popup = window.globalVars.map.querySelector('.popup');
      window.globalVars.map.removeChild(popup);
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.globalVars.ESC_KEYCODE) {
      // var popup = window.globalVars.map.querySelector('.popup');

      window.globalVars.map.removeChild(window.globalVars.popup);
    }
  };
  // выбор features натабыванием с клавиатуры
  var featActive = document.querySelector('.features');
  var onFeaturesEnterPress = function (evt) {
    if (evt.keyCode === window.globalVars.ENTER_KEYCODE) {
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
    window.globalVars.map.insertBefore(putIn, mapFilters);
  };

  var mapFilters = window.globalVars.map.querySelector('.map__filters-container');
  window.globalVars.map.classList.add('map--faded');

  // отключаем активность у полей
  // для начального экрана

  window.globalVars.formElement.classList.add('notice__form--disabled');

  // ищем стартовый пин
  var startPin = document.querySelector('.map__pin--main');

  var mouseupOnStartPin = function () {
    window.globalVars.map.classList.remove('map--faded');
    window.globalVars.formElement.classList.remove('notice__form--disabled');
    makePins();
    putMapPins.appendChild(fragment);

    var pins = window.globalVars.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    [].forEach.call(pins, function (item, index) {
      item.addEventListener('click', function () {
        var popup = window.globalVars.map.querySelector('.popup');
        if (popup !== null) {
          window.globalVars.map.removeChild(popup);
        }
        generateCard(window.getDataAds(index));
      });
    });

    var fieldsets = window.globalVars.formElement.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  };
  // клик на сохранить и отмена
  var findBtn = document.querySelector('.form__element--submit');
  var findSubmit = findBtn.querySelector('.form__submit');
  var findCancel = findBtn.querySelector('.form__reset');

  var cleanPage = function () {
    window.getAddress(window.globalVars.INITIAL_POSITON_X, window.globalVars.INITIAL_POSITION_Y); // метка адреса в исх состояние
    window.globalVars.map.removeChild(window.globalVars.popup); // скрыть активный попап
    // функция, очищающая все поля, скрывающая метки
    var clear = function () {
      var field = document.querySelectorAll('.notice__form');
      for (var i = 0; i < field.length; i++) {
        field[i].reset();
      }
    };
    clear();
  };
  // обработчик события на кнопку "Сохранить"
  findSubmit.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      cleanPage();
    });
    evt.preventDefault();
  });

  // делаем сброс при нажатии на кнопку сброс
  findCancel.addEventListener('reset', function () {
    cleanPage();
    window.getAddress(window.globalVars.INITIAL_POSITON_X, window.globalVars.INITIAL_POSITION_Y);
  });

  startPin.addEventListener('mouseup', function () {
    mouseupOnStartPin();
    window.getAddress(window.globalVars.INITIAL_POSITON_X, window.globalVars.INITIAL_POSITION_Y);
  });
})();

// drag n drop
var startPin = document.querySelector('.map__pin--main');
startPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.pageX,
    y: evt.pageY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    window.getAddress(moveEvt.pageX, moveEvt.pageY);


    var shift = {
      x: startCoords.x - moveEvt.pageX,
      y: startCoords.y - moveEvt.pageY
    };

    startCoords = {
      x: moveEvt.pageX,
      y: moveEvt.pageY
    };

    var calculateCoordsOfPin = function () {
      if (startCoords.x < window.globalVars.LIMIT_OF_X_MIN) {
        startPin.style.left = (window.globalVars.LIMIT_OF_X_MIN - 0.5 * window.globalVars.PIN_WIDTH) + 'px';
      } else if (startCoords.x > window.globalVars.LIMIT_OF_X_MAX) {
        startPin.style.left = (window.globalVars.LIMIT_OF_X_MAX + 0.5 * window.globalVars.PIN_WIDTH) + 'px';
      } else {
        startPin.style.left = (startPin.offsetLeft - shift.x) + 'px';
      }
      if (startCoords.y < window.globalVars.LIMIT_OF_Y_MIN) {
        startPin.style.top = (window.globalVars.LIMIT_OF_Y_MIN - window.globalVars.PIN_HEIGHT) + 'px';
      } else if (startCoords.y > window.globalVars.LIMIT_OF_Y_MAX) {
        startPin.style.top = (window.globalVars.LIMIT_OF_Y_MAX + window.globalVars.PIN_HEIGHT) + 'px';
      } else {
        startPin.style.top = (startPin.offsetTop - shift.y) + 'px';
      }
    };
    calculateCoordsOfPin();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    window.getAddress(upEvt.pageX, upEvt.pageY);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
