import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  TextInput,
  Button,
  Checkbox
} from "react-native-paper";
import axios from "axios";

export default function CreateTodoScreen(props) {
  const [todo, setTodo] = useState("");
  const [completed, setCompleted] = useState(false);

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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15
          }}
        >
          <Checkbox
            status={completed ? "checked" : "unchecked"}
            onPress={() => setCompleted(!completed)}
          />
          <Text>Completed</Text>
        </View>
        <Button
          style={{ marginTop: 15 }}
          mode="contained"
          onPress={() => {
            axios
              .post("https://ancient-reaches-80096.herokuapp.com/todos/", {
                title: todo,
                completed: completed
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
