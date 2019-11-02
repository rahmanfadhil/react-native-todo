import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Provider as PaperProvider, Appbar, List } from "react-native-paper";
import axios from "axios";

function useTodos() {
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

  // Fetch all todos when app started
  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, toggleTodo };
}

export default function App() {
  const { todos, toggleTodo } = useTodos();

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Todo App" />
      </Appbar.Header>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            onPress={() => toggleTodo(item.id, item.completed)}
            title={item.title}
            left={props => (
              <List.Icon
                {...props}
                icon={
                  item.completed ? "checkbox-marked" : "checkbox-blank-outline"
                }
              />
            )}
          />
        )}
      />
    </PaperProvider>
  );
}
