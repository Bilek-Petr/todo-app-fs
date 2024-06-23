import './modules/utility.js';
import './modules/todo-actions.js';
import './modules/api.js';

import { toggleTheme } from './modules/theme.js';

const themeBtn = document.querySelector('.header__btn-theme');

themeBtn.addEventListener('click', toggleTheme);
