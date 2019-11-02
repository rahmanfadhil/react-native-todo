import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  Appbar,
  Provider as PaperProvider,
  TextInput,
  Checkbox,
  Button
} from "react-native-paper";
import axios from "axios";

export default function TodoEditScreen(props) {
  const item = props.navigation.getParam("item");

  const [todo, setTodo] = useState(item.title);
  const [completed, setCompleted] = useState(item.completed);

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Action
          icon="chevron-left"
          onPress={() => props.navigation.goBack()}
        />
        <Appbar.Content title="Todo Edit" />
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
              .patch(
                `https://ancient-reaches-80096.herokuapp.com/todos/${item.id}/`,
                {
                  title: todo,
                  completed: completed
                }
              )
              .then(data => {
                props.navigation.goBack();
              });
          }}
        >
          Update todo
        </Button>
      </View>
    </PaperProvider>
  );
}
