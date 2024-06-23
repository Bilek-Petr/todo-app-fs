const body = document.body;
const themeIcon = document.querySelector('.themeIcon');

export const setTheme = () => {
   body.classList.add('theme-light');
   if (body.classList.contains('theme-dark')) {
      themeIcon.src = '/assets/images/icon-moon.svg';
   } else {
      themeIcon.src = '/assets/images/icon-sun.svg';
   }
};

export const toggleTheme = () => {
   body.classList.toggle('theme-dark');
   body.classList.toggle('theme-light');
};
