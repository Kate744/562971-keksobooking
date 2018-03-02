'use strict';

(function () {
  // заполнение поля адреса в зависимости от положения метки
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
  var typePrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var validationPrice = function () {
    // цена в сутки в зависимости от типа жилья
    var value = type.value;
    var minPrice = typePrice[value];
    price.setAttribute('min', minPrice);
    price.setAttribute('placeholder', 'от ' + minPrice);
  };
  validationPrice();
  // проверка заполненности поля цены
  var checkPrice = function () {
    var value = type.value;
    var minPrice = typePrice[value];
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

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var calculateRooms = function () {
    if (peopleNumber.options.length > 0) {
      [].forEach.call(peopleNumber.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumber.value] [0] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  };


  calculateRooms();
  roomNumber.addEventListener('change', calculateRooms);
  // захватываем событие на форме и обрамляем красным
  var inputError = [];
  window.globalVars.formElement.addEventListener('invalid', function (evt) {
    checkPrice();
    checkTitle();
    evt.target.style.borderColor = '#ff2400';
    inputError.push(evt.target);
  }, true);

  // ищем поле адреса и рассчитываем координату с поправкой на размеры пина

  window.getAddress = function (coordX, coordY) {
    window.globalVars.address.placeholder = (coordX + window.globalVars.PIN_WIDTH / 2) + ', ' + (coordY + window.globalVars.PIN_HEIGHT);
  };

})();
