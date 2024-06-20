const body = document.body;

export const toggleTheme = () => {
   body.classList.toggle('theme-dark');
   body.classList.toggle('theme-light');
};

// themeBtn.addEventListener('click', toggleTheme);
