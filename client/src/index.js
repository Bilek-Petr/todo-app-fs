import './assets/scripts/main.js';
import './assets/styles/main.scss';

import { setThemeIcon } from './assets/scripts/modules/theme.js';
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
   body.classList.add('theme-light');
   setThemeIcon();
});
