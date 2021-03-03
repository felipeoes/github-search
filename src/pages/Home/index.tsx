import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../contexts/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

import { DescriptionText, HomeHeader, HomeView, LogOutView, NameText, OverlayView, RectangleView, RepoInfo, RepoView, TextUser, UserImage } from "../../components";
import Icon from "react-native-vector-icons/Feather";


export default function Home() {
  const { signOut, user } = useAuth();
  const [reposData, setReposData] = useState<any[]>();
  const [followersData, setFollowersData] = useState<any[]>();
  const [followingData, setFollowingData] = useState<any[]>();
  const [hasData, setHasData] = useState(true);
  const [hasEmail, setHasEmail] = useState(true);
  
  useEffect(function () {
    const fetchData = async () => {
      try {
        setFollowersData(followersData);
        setReposData(reposData);
        setFollowingData(followingData);
        if (user?.name === undefined) setHasData(false);
        if (user?.email === null || user?.email === undefined || user?.email === "null" || user?.email === "undefined") setHasEmail(false);
      } catch (error) {
        console.log("error while calling api");
        alert(error.message);
      }

    };
    fetchData();
    
  }, []);

  function handleSignOut() {
    signOut();
  }

  return (
    <>
        { hasData ?
          (
            <>
              <HomeView>
                <HomeHeader>
                  <TextUser>#{user?.login}</TextUser>
                  <TouchableOpacity style={{ width: '90%'}} onPress={handleSignOut}>
                    <LogOutView>
                      <Text
                        style={{ color: "#FFFFFF", fontSize: 17, marginRight: 10 }}
                      >
                        Sair
                  </Text>
                  <Icon name="log-out" color="#D03434" size={26} />
                    </LogOutView>
                  </TouchableOpacity>
                </HomeHeader>
                <UserImage
                  source={{
                    uri: user?.avatar_url,
                  }}
                />
                <RectangleView>
                  <Text></Text>
                </RectangleView>
                <View style={{ marginTop: -35, marginLeft: 25 }}>
                  <NameText>{user?.name}</NameText>
                  <DescriptionText>{hasEmail ? user?.email : "Email privado"}</DescriptionText>
                  <DescriptionText>{user?.location}</DescriptionText>
                </View>
                <RepoView>
                  <RepoInfo>
                    {user?.followers}
                    {"\n"}
                    <DescriptionText>Seguidores</DescriptionText>
                  </RepoInfo>
                  <RepoInfo>
                    {user?.following}
                    {"\n"}
                    <DescriptionText>Seguindo</DescriptionText>
                  </RepoInfo>
                  <RepoInfo>
                    {user?.public_repos}
                    {"\n"}
                    <DescriptionText>Repositórios</DescriptionText>
                  </RepoInfo>
                </RepoView>
                <RectangleView style={{ marginTop: 50 }}>
                  <Text></Text>
                </RectangleView>
                <View style={{ marginTop: -35, marginLeft: 25 }}>
                  <NameText>BIO</NameText>
                  <DescriptionText>{user?.bio}</DescriptionText>
                </View>
              </HomeView>
            </>
          )
          :
          (

            <OverlayView>
              <HomeHeader>
                <TextUser>#{user?.login}</TextUser>
                <TouchableOpacity onPress={handleSignOut}>
                  <LogOutView>
                    <Text
                      style={{ color: "#FFFFFF", fontSize: 17, marginRight: 10 }}
                    >
                      Sair
                </Text>
                <Icon name="log-in" color="#D03434" size={26} />
                  </LogOutView>
                </TouchableOpacity>
              </HomeHeader>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 50,
                  color: "#fff",
                }}
              >
                Usuário não encontrado
          </Text>
            </OverlayView>
          )}
    </>
  );
}
