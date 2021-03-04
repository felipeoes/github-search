import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import {
  DescriptionText,
  HomeHeader,
  IconView,
  ItemSeparator,
  MainView,
  RectangleView,
  RepoName,
  TextUser,
} from "../../components";

export default function Repos() {
  const { user, repos } = useAuth();

  const navigation = useNavigation();

  function handleOnPress() {
    navigation.navigate("Home");
  }

  return (
    <MainView>
      <HomeHeader style={{ height: 98 }}>
        <TouchableOpacity onPress={handleOnPress}>
          <Icon name="arrow-left" color="#FFFFFF" size={26} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TextUser>{user?.public_repos} repositórios</TextUser>
        </View>
      </HomeHeader>
      <StatusBar style="light" />
      <FlatList
        data={repos}
        keyExtractor={(item: any) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => {
          return (
            <>
              <View style={{ marginTop: 19, paddingLeft: 11 }}>
                <RectangleView style={{ marginTop: 10, marginLeft: -20 }} />
                <View style={{ paddingLeft: 17 }}>
                  <RepoName>{item?.name}</RepoName>
                  <DescriptionText style={{ marginTop: 5 }}>
                    {item.description}
                  </DescriptionText>
                  <IconView>
                    <IconView style={{ marginRight: 20, marginTop: 0 }}>
                      <Icon
                        style={{ marginRight: -5 }}
                        name="star"
                        color="#FFCE00"
                        size={17}
                      ></Icon>
                      <DescriptionText style={{ marginLeft: 15 }}>
                        {item?.stargazers_count}
                      </DescriptionText>
                    </IconView>
                    <IconView style={{ marginRight: 20, marginTop: 0 }}>
                      <Icon
                        style={{ marginRight: 10 }}
                        name="lock"
                        color="#63BF1F"
                        size={17}
                      />
                      <Icon name="unlock" color="#CC042A" size={17} />
                    </IconView>
                  </IconView>
                </View>
              </View>
            </>
          );
        }}
      />
    </MainView>
  );
}
