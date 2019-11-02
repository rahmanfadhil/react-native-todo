import React from "react";
import { View, Text } from "react-native";
import { Appbar, Provider as PaperProvider } from "react-native-paper";

export default function TodoDetailScreen(props) {
  const todo = props.navigation.getParam("item");

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Action
          icon="chevron-left"
          onPress={() => props.navigation.goBack()}
        />
        <Appbar.Content title="Todo Detail" />
      </Appbar.Header>
      <View>
        <Text>Title: {todo.title}</Text>
        <Text>Completed: {todo.completed ? "True" : "False"}</Text>
      </View>
    </PaperProvider>
  );
}
