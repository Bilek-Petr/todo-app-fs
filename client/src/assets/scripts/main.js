import './modules/utility.js';
import './modules/todo-actions.js';
import './modules/api.js';

import { toggleTheme } from './modules/theme.js';
export const API_URL = 'http://localhost:3000/tasks';

const themeBtn = document.querySelector('.header__btn-theme');
themeBtn.addEventListener('click', toggleTheme);
