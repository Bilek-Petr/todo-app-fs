import './modules/utility.js';
import { toggleTheme } from './modules/theme.js';

const themeBtn = document.querySelector('.header__btn-theme');

themeBtn.addEventListener('click', toggleTheme);
