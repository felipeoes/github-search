import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Text } from "react-native";
import {
  HomeHeader,
  TextUser,
  LogOutView,
  MainView,
  ErrorText,
  ErrorView,
} from "../../components";
import { useNavigation } from "@react-navigation/native";

export default function ErrorHome() {
  const navigation = useNavigation();

  function handleSignOut() {
    navigation.navigate("Auth");
  }

  return (
    <MainView>
      <HomeHeader>
        <TextUser>#</TextUser>
        <TouchableOpacity onPress={handleSignOut}>
          <LogOutView>
            <Text style={{ color: "#FFFFFF", fontSize: 17, marginRight: 10 }}>
              Voltar
            </Text>
            <Icon name="log-in" color="#D03434" size={26} />
          </LogOutView>
        </TouchableOpacity>
      </HomeHeader>
      <ErrorView>
        <ErrorText>Usuário não encontrado</ErrorText>
      </ErrorView>
    </MainView>
  );
}
