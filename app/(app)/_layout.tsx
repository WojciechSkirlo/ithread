// import { useState } from 'react';
import { Pressable } from 'react-native';
// import { Redirect, Stack, Link } from 'expo-router';
import { Stack, Link } from 'expo-router';
import { Colors } from '@helpers/colors';
import { ArrowLeft } from 'iconsax-react-native';

export default function AppLayout() {
  // const [isAuthenticated] = useState(false);

  // if (!isAuthenticated) {
  //   return <Redirect href="/sign-in" />;
  // }

  return <Stack />;

  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium'
          },
          headerTitleAlign: 'center',
          headerTitle: 'Chat',
          headerStyle: {
            backgroundColor: Colors.White
          },
          headerLeft: ({ canGoBack }) =>
            canGoBack && (
              <Link href="/(app)/(tabs)" asChild>
                <Pressable>
                  <ArrowLeft color={Colors.GrayDark} variant="Linear" size={24} />
                </Pressable>
              </Link>
            ),
          headerShadowVisible: false
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
