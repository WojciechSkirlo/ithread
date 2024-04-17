import React from 'react';
import { Pressable } from 'react-native';
import { Link, Tabs } from 'expo-router';
import { AddSquare, NotificationStatus } from 'iconsax-react-native';
import { Colors } from '@helpers/colors';
import UIIcon from '@components/UI/Icon';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        unmountOnBlur: true,
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
          headerRight: () => (
            <Link href="/search" asChild style={{ marginRight: 16 }}>
              <Pressable>
                <AddSquare color={Colors.GrayDark} variant="Outline" size={24} />
              </Pressable>
            </Link>
          ),
          tabBarIcon: ({ color, focused }) => (
            <UIIcon name="Messages1" color={color} variant={`${focused ? 'Bold' : 'Linear'}`} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, focused }) => (
            <UIIcon name="Element4" color={color} variant={`${focused ? 'Bold' : 'Linear'}`} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <UIIcon name="User" color={color} variant={`${focused ? 'Bold' : 'Linear'}`} size={24} />
          )
        }}
      />
    </Tabs>
  );
}
