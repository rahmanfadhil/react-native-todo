import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  List,
  TextInput,
  Button
} from "react-native-paper";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
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

  return { todos, fetchTodos, toggleTodo };
}

function HomeScreen(props) {
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

function CreateTodoScreen(props) {
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

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null } },
  CreateTodo: { screen: CreateTodoScreen, navigationOptions: { header: null } }
});

export default createAppContainer(AppNavigator);
