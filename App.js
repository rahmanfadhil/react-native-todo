import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Provider as PaperProvider, Appbar, List } from "react-native-paper";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://ancient-reaches-80096.herokuapp.com/todos/")
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

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
            onPress={() => {
              console.log("pressed!");
            }}
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
