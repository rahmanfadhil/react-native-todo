import React from "react";
import { FlatList } from "react-native";
import { Provider as PaperProvider, Appbar, List } from "react-native-paper";

import useTodos from "../utils/useTodos";

export default function HomeScreen(props) {
  const { todos, toggleTodo, fetchTodos } = useTodos();

  // Fetch all todos when app started
  props.navigation.addListener("didFocus", () => {
    fetchTodos();
  });

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Todo App" />
        <Appbar.Action
          icon="plus"
          onPress={() => props.navigation.navigate("CreateTodo")}
        />
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
