import React from 'react';
import Home from '../pages/Home';
import Repos from '../pages/Repos';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Followers from '../pages/Followers';
import Following from '../pages/Following';
import { StatusBar } from 'expo-status-bar';
const Tab = createMaterialBottomTabNavigator();

export default function AppRoutes() {

  return (
    <>
      <Tab.Navigator
        backBehavior='history'
        shifting={false}
        labeled

        sceneAnimationEnabled={false}
        activeColor='#000000'
        inactiveColor='#A5A5A5'
        style={{ width: '100%', backgroundColor: '#292929' }}
        barStyle={{
          marginTop: 10,
          paddingTop: 10,
          height: 80,
          width: '100%',
          backgroundColor: '#ffffff',
          borderTopColor: '#000',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden'
        }}
      >
        <Tab.Screen name="Home" options={{

          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }} component={Home} />
        <Tab.Screen name="Repos" options={{
          tabBarLabel: 'Repos',
          tabBarIcon: ({ color }) => (
            <Icon name="github" color={color} size={26} />
          ),
        }}
          component={Repos} />
        <Tab.Screen name="Seguidores" options={{
          tabBarLabel: 'Seguidores',
          tabBarIcon: ({ color }) => (
            <Icon name="users" color={color} size={26} />
          ),
        }}
          component={Followers} />
        <Tab.Screen name="Seguindo" options={{

          tabBarLabel: 'Seguindo',
          tabBarIcon: ({ color }) => (
            <Icon name="users" color={color} size={26} />
          ),
        }} component={Following} />
      </Tab.Navigator>
      <StatusBar style="light" />
    </>
  );
}
