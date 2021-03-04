import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import {
  ButtonView,
  DescriptionText,
  HomeHeader,
  ItemSeparator,
  ListView,
  MainImage,
  MainView,
  NameText,
  RectangleView,
  RepoInfo,
  RepoView,
  SaveView,
  TextUser,
  UserImage,
} from "../../components";
import Loading from "../Loading";
import octokit from "../../services/api";
import { state } from "../Auth";
import { checkEmail } from "../../services/helpers";

export default function Following({ route }) {
  const { user, following, signIn } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [homeVisibility, setHomeVisibility] = useState("0%");
  const [followingVisibility, setFollowingVisibility] = useState("100%");
  const [followingUserData, setFollowingUserData] = useState<any>();
  const [hasEmail, setHasEmail] = useState(true);

  function handleOnBack() {
    navigation.navigate("Seguidores");
  }

  function handleOnSave() {
    setLoading(true);
    handleOnPress();
    state.username = followingUserData.login;
    signIn();
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Home");
    }, 3000);
  }

  async function getCurrentUser(user) {
    const resp = await octokit.request(`GET /users/${user.login}`);
    const data = await resp.data;
    setFollowingUserData(data);
  }

  function handleOnPress() {
    if (homeVisibility === "100%") {
      setHomeVisibility("0%");
      setFollowingVisibility("100%");
    } else {
      setHomeVisibility("100%");
      setFollowingVisibility("0%");
    }
  }

  return (
    <>
      <MainView style={{ width: followingVisibility }}>
        <HomeHeader style={{ height: 98 }}>
          <TouchableOpacity onPress={handleOnBack}>
            <Icon name="arrow-left" color="#FFFFFF" size={26} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TextUser style={{ textAlign: "left" }}>
              {user?.following} seguindo
            </TextUser>
          </View>
        </HomeHeader>
        <StatusBar style="light" />
        <FlatList
          data={following}
          keyExtractor={(item: any) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => {
            return (
              <>
                <ListView>
                  <View>
                    <RectangleView style={{ marginTop: 10, marginLeft: -20 }} />
                    <MainImage
                      source={{
                        uri: item?.avatar_url,
                      }}
                    />
                  </View>
                  <ButtonView
                    onPress={() => {
                      handleOnPress();
                      getCurrentUser(item);
                    }}
                  >
                    <TextUser
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        lineHeight: 30,
                      }}
                    >
                      #{item?.login}
                    </TextUser>
                    <Icon
                      style={{ marginRight: -5 }}
                      name="arrow-right"
                      color="#FFFFFF"
                      size={22}
                    />
                  </ButtonView>
                </ListView>
              </>
            );
          }}
        />
      </MainView>

      {loading ? (
        <Loading value={"SALVANDO"} />
      ) : (
        <View style={{ width: homeVisibility, height: homeVisibility }}>
          <MainView>
            <HomeHeader>
              <TouchableOpacity onPress={handleOnPress}>
                <Icon name="arrow-left" color="#FFFFFF" size={26} />
              </TouchableOpacity>
              <TextUser style={{ paddingLeft: 50 }}>
                #{followingUserData?.login}
              </TextUser>
              <TouchableOpacity onPress={handleOnSave}>
                <SaveView>
                  <Text
                    style={{ color: "#FFFFFF", fontSize: 17, marginRight: 10 }}
                  >
                    Salvar
                  </Text>
                  <Icon name="log-in" color="#5CBC29" size={26} />
                </SaveView>
              </TouchableOpacity>
            </HomeHeader>
            <StatusBar style="light" />
            <UserImage
              source={{
                uri: followingUserData?.avatar_url,
              }}
            />
            <RectangleView>
              <Text></Text>
            </RectangleView>
            <View style={{ marginTop: -35, marginLeft: 25 }}>
              <NameText>{followingUserData?.name}</NameText>
              <DescriptionText>
                {checkEmail(followingUserData)
                  ? followingUserData?.email
                  : "Email privado"}
              </DescriptionText>
              <DescriptionText>{followingUserData?.location}</DescriptionText>
            </View>
            <RepoView>
              <RepoInfo>
                {followingUserData?.followers}
                {"\n"}
                <DescriptionText>Seguidores</DescriptionText>
              </RepoInfo>
              <RepoInfo>
                {followingUserData?.following}
                {"\n"}
                <DescriptionText>Seguindo</DescriptionText>
              </RepoInfo>
              <RepoInfo>
                {followingUserData?.public_repos}
                {"\n"}
                <DescriptionText>Repositórios</DescriptionText>
              </RepoInfo>
            </RepoView>
            <RectangleView style={{ marginTop: 50 }}>
              <Text></Text>
            </RectangleView>
            <View style={{ marginTop: -35, marginLeft: 25 }}>
              <NameText>BIO</NameText>
              <DescriptionText>{followingUserData?.bio}</DescriptionText>
            </View>
          </MainView>
        </View>
      )}
    </>
  );
}
