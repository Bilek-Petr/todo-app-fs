import { fetchTodos } from './api';

const taskInput = document.querySelector('.header__input');

//----------------------------------------------------------------
//NEW TASK
//----------------------------------------------------------------
async function handleTaskInput(e) {
   const task = e.target.value.trim();
   if (!task) return;

   const todo = { task };
   console.log('Sending todo:', todo);

   try {
      const response = await fetch('http://localhost:3000/tasks', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(todo),
      });

      if (!response.ok) {
         throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      console.log('Success:', newTask);

      // Fetch updated todos and render them
      const todos = await fetchTodos();
      renderTodos(todos);
   } catch (error) {
      console.error('Error:', error);
   }
}

//----------------------------------------------------------------
//RENDER A NEW TASK
//----------------------------------------------------------------
export function renderTodos(todos) {
   const tasksContainer = document.querySelector('.tasks');
   tasksContainer.innerHTML = '';
   todos.forEach((todo) => {
      const li = document.createElement('li');
      li.className = 'tasks__item';
      li.id = todo._id;
      li.innerHTML = `
            <div class="tasks__content">
                <input class="tasks__checkbox" type="checkbox" name="task-name" id="${todo._id}">
                <span class="tasks__text" contenteditable>${todo.task}</span>
            </div>
            <div>
                <button class="tasks__remove-btn" title="Remove task ${todo.task}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="delete-icon">
                        <path d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
                    </svg>
                </button>
            </div>
        `;
      tasksContainer.appendChild(li);
   });
}

//----------------------------------------------------------------
//DELETE TASK
//----------------------------------------------------------------

const tasksContainer = document.querySelector('.tasks');

tasksContainer.addEventListener('click', async (e) => {
   if (e.target.classList.contains('delete-icon')) {
      const taskId = e.target.closest('.tasks__item').id;
      console.log(taskId);
      try {
         console.log(`http://localhost:3000/tasks/${taskId}`);
         const response = fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE',
         });

         console.log(response);

         if (!response.ok) {
            throw new Error('Failed to delete task');
         }

         console.log('Task deleted successfully');
         const todos = await fetchTodos();
         renderTodos(todos);
      } catch (error) {
         console.error(`Error: ${error}`);
      }
   }
});

//----------------------------------------------------------------
//LISTENERS
//----------------------------------------------------------------
taskInput.addEventListener('keyup', (e) => {
   if (e.code === 'Enter') {
      handleTaskInput(e);
   }
});
