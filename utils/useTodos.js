import { useState } from "react";
import axios from "axios";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all todos from REST API
  async function fetchTodos() {
    setLoading(true);
    const data = await axios.get(
      "https://ancient-reaches-80096.herokuapp.com/todos/"
    );
    setTodos(data.data);
    setLoading(false);
  }

  // Toggle todo completed status
  function toggleTodo(id, completed) {
    axios
      .patch(`https://ancient-reaches-80096.herokuapp.com/todos/${id}/`, {
        completed: !completed
      })
      .then(data => fetchTodos());
  }

  function deleteTodo(id) {
    axios
      .delete(`https://ancient-reaches-80096.herokuapp.com/todos/${id}/`)
      .then(data => fetchTodos());
  }

  return { todos, fetchTodos, toggleTodo, deleteTodo, loading };
}
