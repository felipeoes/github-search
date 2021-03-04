import React, { useState } from "react";
import { useAuth } from "../../contexts/auth";
import Icon from "react-native-vector-icons/EvilIcons";
import Logo from "react-native-vector-icons/Feather";
import Loading from "../Loading";
import { Text, View } from "react-native";
import {
  ButtonText,
  InputText,
  LogInButton,
  LogoImage,
  SignView,
  TextTooltip,
} from "../../components";

export let state = {
  username: "" as string,
};

export default function Auth() {
  const { signIn } = useAuth();
  const [tooltip, setTooltip] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const checkTextInput = () => {
    if (!userName.trim()) {
      setTooltip("Campo obrigatório");
      return;
    }
    setTooltip("");
    state.username = userName;

    handleSignIn();
  };

  function handleSignIn() {
    setLoading(true);
    signIn();
  }

  return (
    <>
      <SignView>
        <LogoImage>
          <Icon name="sc-github" color="#FFCE00" size={300} />
        </LogoImage>
        <InputText
          editable
          clearTextOnFocus
          onChangeText={(value) => setUserName(value)}
          placeholder={"Usuário"}
          style={{
            width: "90%",
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E5E5",
            borderRadius: 10,
            borderBottomColor: "#000000",
            borderBottomWidth: 1,
          }}
        ></InputText>
        <TextTooltip>{tooltip}</TextTooltip>
        <LogInButton onPress={checkTextInput}>
          <ButtonText>ENTRAR</ButtonText>
          <Logo
            style={{ marginRight: 30, marginLeft: -40 }}
            name="arrow-right"
            color="#000"
            size={26}
          />
        </LogInButton>
      </SignView>
      {loading ? <Loading value={"BUSCANDO"} /> : <View></View>}
    </>
    
  );
}
