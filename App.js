import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Provider as PaperProvider, Appbar, List } from "react-native-paper";

const todo_list = [
  {
    id: 1,
    title: "Learn Django",
    completed: false
  },
  {
    id: 2,
    title: "Learn React Native",
    completed: false
  },
  {
    id: 3,
    title: "Learn VueJS",
    completed: false
  },
  {
    id: 4,
    title: "Learn React",
    completed: true
  },
  {
    id: 5,
    title: "Learn Angular",
    completed: true
  }
];

export default function App() {
  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Todo App" />
      </Appbar.Header>
      <FlatList
        data={todo_list}
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
