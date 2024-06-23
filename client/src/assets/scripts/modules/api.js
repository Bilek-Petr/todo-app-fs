const API_URL = 'http://localhost:3000/tasks';

export async function fetchTodos() {
   try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
         throw new Error('Failed to fetch tasks');
      }

      return await response.json();
   } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., display error message)
      return [];
   }
}

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
