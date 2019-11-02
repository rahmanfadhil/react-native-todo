import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./screens/HomeScreen";
import CreateTodoScreen from "./screens/CreateTodoScreen";
import TodoDetailScreen from "./screens/TodoDetailScreen";
import TodoEditScreen from "./screens/TodoEditScreen";

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null } },
  CreateTodo: { screen: CreateTodoScreen, navigationOptions: { header: null } },
  TodoDetailScreen: {
    screen: TodoDetailScreen,
    navigationOptions: { header: null }
  },
  TodoEditScreen: {
    screen: TodoEditScreen,
    navigationOptions: { header: null }
  }
});

export default createAppContainer(AppNavigator);
