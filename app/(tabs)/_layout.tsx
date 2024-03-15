import React from 'react';
import { Tabs } from 'expo-router';
import { MessageText, User, Element4 } from 'iconsax-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#222222',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingHorizontal: 40,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 0,
          elevation: 20
        },
        headerStyle: {
          backgroundColor: '#fff'
          // shadowColor: '#000',
          // shadowOffset: { width: 0, height: 0 },
          // shadowOpacity: 0.00,
          // shadowRadius: 0,
          // elevation: 20,
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-Medium'
        },
        headerTitleAlign: 'center'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MessageText color={color} variant={`${focused ? 'Bold' : 'Linear'}`} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, focused }) => (
            <Element4 color={color} variant={`${focused ? 'Bold' : 'Linear'}`} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User color={color} variant={`${focused ? 'Bold' : 'Linear'}`} size={24} />
          )
        }}
      />
    </Tabs>
  );
}
