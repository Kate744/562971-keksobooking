'use strict';

(function () {

  var formElement = document.querySelector('.notice__form');
  var map = document.querySelector('.map');
  var address = document.querySelector('#address');

  window.globalVars = {
    formElement: formElement,
    map: map,
    address: address,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    PIN_WIDTH: 40,
    PIN_HEIGHT: 40,
    COUNT: 8,
    LIMIT_OF_X_MIN: 300,
    LIMIT_OF_X_MAX: 900,
    LIMIT_OF_Y_MIN: 150,
    LIMIT_OF_Y_MAX: 500,

  };

})();
