// File: public/scripts/app.js

// Define a function to fetch and render todos
async function fetchAndRenderTodos() {
   try {
      const response = await fetch('http://localhost:3000/tasks');
      if (!response.ok) {
         throw new Error('Failed to fetch tasks');
      }

      const todos = await response.json();
      renderTodos(todos);
   } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., display error message)
   }
}

// Function to render todos based on data
function renderTodos(todos) {
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="icon">
                        <path d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
                    </svg>
                </button>
            </div>
        `;
      tasksContainer.appendChild(li);
   });
}

// Function to poll for updates every 5 seconds (adjust as needed)
function startPolling() {
   setInterval(fetchAndRenderTodos, 5000); // Poll every 5 seconds
}

// Initial call to fetch and render todos when the page loads
document.addEventListener('DOMContentLoaded', () => {
   fetchAndRenderTodos(); // Fetch initial todos
   startPolling(); // Start polling for updates
});
