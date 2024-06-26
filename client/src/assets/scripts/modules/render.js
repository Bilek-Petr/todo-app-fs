import { updateTodo } from './api';

/**
 * Renders a list of todos in the DOM.
 **/

export function renderTodos(todos) {
   const tasksContainer = document.querySelector('.tasks');
   tasksContainer.innerHTML = '';

   todos.forEach((todo) => {
      const li = createTodoElement(todo);
      tasksContainer.appendChild(li);
   });
}

function createTodoElement(todo) {
   const li = document.createElement('li');
   li.className = 'tasks__item';
   li.id = todo._id;

   //on render if it's completed already
   if (todo.completed) {
      li.classList.add('completed');
   }

   // Create inner HTML for list item
   li.innerHTML = `
      <div class="tasks__content">
         <input class="tasks__checkbox" type="checkbox" name="task-name" id="${
            todo._id
         }" ${todo.completed ? 'checked' : ''}>
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

   //    Add checkbox change event listener
   const checkbox = li.querySelector('.tasks__checkbox');
   checkbox.addEventListener('change', async () => {
      console.log(`Checkbox for task ${todo._id} changed to ${checkbox.checked}`);
      try {
         await updateTodo(todo._id, { completed: checkbox.checked });
         todo.completed = checkbox.checked; // Update local todo state
         li.classList.toggle('completed', todo.completed);
      } catch (error) {
         console.error('Error updating task completion:', error);
      }
   });

   return li;
}
