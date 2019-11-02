import React from "react";
import { TextInput, Button, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default class LoginScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = () => {
    console.log("email: ", this.state.email);
    console.log("password: ", this.state.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>
        <TextInput
          value={this.email}
          placeholder="Email"
          style={styles.input}
          onChangeText={text => {
            this.setState({ email: text });
          }}
        />
        <TextInput
          value={this.password}
          placeholder="Password"
          style={styles.input}
          onChangeText={text => {
            this.setState({ password: text });
          }}
        />
        <Button mode="contained" onPress={this.onSubmit}>
          Login
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25
  },
  input: {
    marginBottom: 15
  },
  container: {
    padding: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
});
