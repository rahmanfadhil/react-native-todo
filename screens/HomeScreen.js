import React from "react";
import { FlatList, Alert, View } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  List,
  ActivityIndicator
} from "react-native-paper";

import useTodos from "../utils/useTodos";

export default function HomeScreen(props) {
  const { todos, toggleTodo, fetchTodos, deleteTodo, loading } = useTodos();

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
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator animating={true} size={32} />
        </View>
      ) : (
        <FlatList
          refreshing={loading}
          onRefresh={fetchTodos}
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <List.Accordion
              title={item.title}
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    item.completed
                      ? "checkbox-marked"
                      : "checkbox-blank-outline"
                  }
                />
              )}
            >
              <List.Item
                style={{ marginLeft: 50 }}
                left={props => <List.Icon {...props} icon="check" />}
                title="Complete"
                onPress={() => toggleTodo(item.id, item.completed)}
              />
              <List.Item
                style={{ marginLeft: 50 }}
                left={props => <List.Icon {...props} icon="information" />}
                title="Detail"
                onPress={() => {
                  props.navigation.navigate("TodoDetailScreen", { item });
                }}
              />
              <List.Item
                style={{ marginLeft: 50 }}
                left={props => <List.Icon {...props} icon="delete" />}
                title="Delete"
                onPress={() => deleteTodo(item.id)}
              />
            </List.Accordion>
          )}
        />
      )}
    </PaperProvider>
  );
}
