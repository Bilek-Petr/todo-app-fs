<<<<<<< HEAD
const input = document.querySelector('.header__input');

input.addEventListener('keyup', (e) => {
   if (e.code === 'Enter') {
      const task = e.target.value.trim();
      if (!task) return;

      const todo = { task };
      console.log('Sending todo:', todo);

      fetch('http://localhost:3000/tasks', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(todo),
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            return response.json();
         })
         .then((data) => {
            console.log('Success:', data);
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   }
});
=======


 
>>>>>>> e5c477e7fd53b744316dd1f64c35ab1b3c56d841
