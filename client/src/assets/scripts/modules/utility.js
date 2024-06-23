const input = document.querySelector('.header__input');
const currentLengthDisplay = document.querySelector('.counter');
const characterDisplay = document.querySelector('.character__counter');
const tasksContainer = document.querySelector('.tasks');
const taskCounter = document.querySelector('.stats__count');

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

export const countTasks = () => {
   taskCounter.textContent = tasksContainer.childElementCount;
};

//LISTENERS
input.addEventListener('input', handleInputChange);
