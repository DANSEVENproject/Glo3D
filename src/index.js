'use strict';

//полифилы
import 'nodelist-foreach-polyfill';
import 'element-matches-polyfill';
import 'element-closest-polyfill';
import 'formdata-polyfill';
import 'promise-polyfill';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import changePhoto from './modules/changePhoto';
import validate from './modules/validate';
import sendForm from './modules/sendForm';

//timer
countTimer();
//menu
toggleMenu();
//popup
togglePopUp();
//tabs
tabs();
//slider
slider();
//calculator
calc();
//change team photos
changePhoto();
//validation
validate();
//send-ajax-form
sendForm();