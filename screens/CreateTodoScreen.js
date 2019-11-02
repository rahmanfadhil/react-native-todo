import React, { useState } from "react";
import { View } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  TextInput,
  Button
} from "react-native-paper";
import axios from "axios";

export default function CreateTodoScreen(props) {
  const [todo, setTodo] = useState();

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Action
          icon="chevron-left"
          onPress={() => props.navigation.goBack()}
        />
        <Appbar.Content title="New Todo" />
      </Appbar.Header>
      <View style={{ margin: 15 }}>
        <TextInput
          label="Todo"
          value={todo}
          onChangeText={text => setTodo(text)}
        />
        <Button
          style={{ marginTop: 15 }}
          mode="contained"
          onPress={() => {
            axios
              .post("https://ancient-reaches-80096.herokuapp.com/todos/", {
                title: todo,
                completed: false
              })
              .then(data => {
                props.navigation.goBack();
              });
          }}
        >
          Create todo
        </Button>
      </View>
    </PaperProvider>
  );
}
