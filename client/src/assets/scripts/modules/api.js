export async function fetchTodos() {
   try {
      const response = await fetch('http://localhost:3000/tasks');
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
