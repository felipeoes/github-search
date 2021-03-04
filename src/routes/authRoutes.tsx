import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "../pages/Auth";
import ErrorHome from "../pages/ErrorHome/ErrorHome";

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: "#FFF",
        },
      }}
    >
      <AuthStack.Screen name="Auth" component={Auth} />
      <AuthStack.Screen name="ErrorHome" component={ErrorHome} />
    </AuthStack.Navigator>
  );
}
