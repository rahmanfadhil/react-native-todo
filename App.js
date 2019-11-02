import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./screens/HomeScreen";
import CreateTodoScreen from "./screens/CreateTodoScreen";

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null } },
  CreateTodo: { screen: CreateTodoScreen, navigationOptions: { header: null } }
});

export default createAppContainer(AppNavigator);
