import './modules/utility.js';
import './todo-actions.js';
import './api.js';
import './states.js';

import { toggleTheme } from './modules/theme.js';

const themeBtn = document.querySelector('.header__btn-theme');
themeBtn.addEventListener('click', toggleTheme);
