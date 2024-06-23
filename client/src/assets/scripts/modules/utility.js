const input = document.querySelector('.header__input');
const currentLengthDisplay = document.querySelector('.counter');
const characterDisplay = document.querySelector('.character__counter');

const updateCharacterCount = () => {
   currentLengthDisplay.textContent = input.value.length;
};

const isMaxLength = () => {
   const maxLength = 100;
   if (input.value.length === maxLength) {
      characterDisplay.classList.add('error');
   } else {
      characterDisplay.classList.remove('error');
   }
};

const handleInputChange = () => {
   updateCharacterCount();
   isMaxLength();
};

input.addEventListener('input', handleInputChange);
