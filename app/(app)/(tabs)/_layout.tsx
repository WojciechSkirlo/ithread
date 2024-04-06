import React from 'react';
import { Pressable } from 'react-native';
import { Tabs, Link } from 'expo-router';
import { MessageText, User, Element4, AddCircle, NotificationStatus } from 'iconsax-react-native';
import { Colors } from '@helpers/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.GrayDark,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingHorizontal: 40,
          shadowColor: Colors.Black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 0,
          elevation: 20
        },
        headerStyle: {
          backgroundColor: Colors.White
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 18
        },
        headerTitleAlign: 'center',
        headerTintColor: Colors.GrayDark,
        headerLeft: () => (
          <Link href="/requests" asChild style={{ marginLeft: 16 }}>
            <Pressable>
              <NotificationStatus color={Colors.GrayDark} variant="Outline" size={24} />
            </Pressable>
          </Link>
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MessageText color={color} variant={`${focused ? 'Bold' : 'Linear'}`} size={24} />
          ),
          headerRight: () => (
            <Link href="/search" asChild style={{ marginRight: 16 }}>
              <Pressable>
                <AddCircle color={Colors.GrayDark} variant="Outline" size={24} />
              </Pressable>
            </Link>
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
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <User color={color} variant={`${focused ? 'Bold' : 'Linear'}`} size={24} />
          )
        }}
      />
    </Tabs>
  );
}
