import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import octokit from "../../services/api";
import Loading from "../Loading";
import { ButtonView, DescriptionText, HomeHeader, ItemSeparator, MainImage, ListView, NameText, RectangleView, RepoInfo, RepoView, SaveView, TextUser, UserImage, MainView } from "../../components";
import { state } from "../Auth";
import { checkEmail } from "../../services/helpers";

export default function Followers() {
  const { user, followers } = useAuth();
  const navigation = useNavigation();
  const [followersVisibility, setFollowersVisibility] = useState('100%');
  const [homeVisibility, setHomeVisibility] = useState('0%');
  const [followerUserData, setFollowerUserData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  function handleOnBack() {
    navigation.navigate('Repos');
  }

  function handleOnSave() {
    setLoading(true);
    handleOnPress();
    state.username = followerUserData.login;
    signIn();
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home');
    }, 3000);


  }

  async function getCurrentUser(user) {
    const resp = await octokit.request(`GET /users/${user.login}`);
    const data = await resp.data;
    setFollowerUserData(data);
  }

  function handleOnPress() {
    if (homeVisibility === "100%") {
      setHomeVisibility('0%');
      setFollowersVisibility("100%");
    }
    else {
      setHomeVisibility('100%');
      setFollowersVisibility('0%');
    }
  }

  return (
    <>
      <MainView style={{ width: followersVisibility }}>
        <HomeHeader style={{ height: 98 }}>
          <TouchableOpacity onPress={handleOnBack}>
            <Icon name="arrow-left" color="#FFFFFF" size={26} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TextUser style={{ textAlign: "left" }}>
              {user?.followers} seguidores
          </TextUser>
          </View>
        </HomeHeader>
        <StatusBar style="light" />
        <FlatList
          data={followers}
          keyExtractor={(item: any) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => {
            return (
              <>
                <ListView
                >
                  <View>
                    <RectangleView style={{ marginTop: 10, marginLeft: -20 }} />
                    <MainImage
                      source={{
                        uri: item?.avatar_url,
                      }}
                    />
                  </View>
                  <ButtonView
                    onPress={
                      () => { handleOnPress(); getCurrentUser(item); }
                    }
                  >
                    <TextUser style={{ fontWeight: "bold", fontSize: 20, lineHeight: 30 }}>
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
        <Loading value={"SALVANDO"}/>
      ) :
        (
          <View style={{ width: homeVisibility, height: homeVisibility }}>
            <MainView >
              <HomeHeader>
                <TouchableOpacity onPress={handleOnPress}>
                  <Icon name="arrow-left" color="#FFFFFF" size={26} />
                </TouchableOpacity>
                <TextUser style={{ paddingLeft: 50 }}>#{followerUserData?.login}</TextUser>
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
                  uri: followerUserData?.avatar_url,
                }}
              />
              <RectangleView>
                <Text></Text>
              </RectangleView>
              <View style={{ marginTop: -35, marginLeft: 25 }}>
                <NameText>{followerUserData?.name}</NameText>
                <DescriptionText>{checkEmail(followerUserData) ? followerUserData?.email : "Email privado"}</DescriptionText>
                <DescriptionText>{followerUserData?.location}</DescriptionText>
              </View>
              <RepoView>
                <RepoInfo>
                  {followerUserData?.followers}
                  {"\n"}
                  <DescriptionText>Seguidores</DescriptionText>
                </RepoInfo>
                <RepoInfo>
                  {followerUserData?.following}
                  {"\n"}
                  <DescriptionText>Seguindo</DescriptionText>
                </RepoInfo>
                <RepoInfo>
                  {followerUserData?.public_repos}
                  {"\n"}
                  <DescriptionText>Repositórios</DescriptionText>
                </RepoInfo>
              </RepoView>
              <RectangleView style={{ marginTop: 50 }}>
                <Text></Text>
              </RectangleView>
              <View style={{ marginTop: -35, marginLeft: 25 }}>
                <NameText>BIO</NameText>
                <DescriptionText>{followerUserData?.bio}</DescriptionText>
              </View>
            </MainView>
          </View>
        )
      }
    </>
  );
}
