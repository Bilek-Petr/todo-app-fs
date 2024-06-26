const API_URL = 'http://localhost:3000/tasks';

// Fetch all todos
export async function fetchTodos() {
   try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
         throw new Error('Failed to fetch tasks');
      }

      return await response.json();
   } catch (error) {
      console.error('Error:', error);
      return [];
   }
}

// Fetch filtered todos
export async function fetchFilteredTodos(filterType) {
   try {
      console.log(`fetching ${filterType} todos...`);
      let url = `${API_URL}/filtered`;
      if (filterType === 'completed') {
         url += '?completed=true';
      } else if (filterType === 'active') {
         url += '?completed=false';
      }
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error('Failed to fetch tasks');
      }

      const todos = await response.json();
      console.log(`Fetched ${filterType} todos:`);
      todos.forEach((todo) => {
         console.log(todo); // Log each todo object
      });
      return todos;
   } catch (error) {
      console.error('Error:', error);
      return [];
   }
}

// ----------------------------------------------------------------
// C R U D
// ----------------------------------------------------------------
export async function createTodo(todo) {
   try {
      const response = await fetch(API_URL, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(todo),
      });

      if (!response.ok) {
         throw new Error('Failed to create a task');
      }

      return await response.json();
   } catch (error) {
      console.error('Error creating task:', error);
      throw error;
   }
}

export async function deleteTodo(taskId) {
   try {
      const response = await fetch(`${API_URL}/${taskId}`, {
         method: 'DELETE',
      });

      if (!response.ok) {
         throw new Error('Failed to delete a task');
      }
   } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
   }
}

export async function updateTodo(taskId, updatedData) {
   try {
      console.log(`Updating task ${taskId} with data:`, updatedData);
      const response = await fetch(`${API_URL}/${taskId}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
         throw new Error('Failed to update task');
      }

      return await response.json();
   } catch (error) {
      console.error('Error updating task:', error);
      throw error;
   }
}
