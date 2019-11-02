import { useState } from "react";
import axios from "axios";

export default function useTodos() {
  const [todos, setTodos] = useState([]);

  // Fetch all todos from REST API
  async function fetchTodos() {
    const data = await axios.get(
      "https://ancient-reaches-80096.herokuapp.com/todos/"
    );
    setTodos(data.data);
  }

  // Toggle todo completed status
  function toggleTodo(id, completed) {
    axios
      .patch(`https://ancient-reaches-80096.herokuapp.com/todos/${id}/`, {
        completed: !completed
      })
      .then(data => fetchTodos());
  }

  return { todos, fetchTodos, toggleTodo };
}
