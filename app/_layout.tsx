import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';
import { ArrowLeft } from 'iconsax-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Link } from 'expo-router';
import { Colors } from '@helpers/colors';

SplashScreen.preventAutoHideAsync();

export default function DefaultLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Light': require('@assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Semibold': require('@assets/fonts/Poppins-SemiBold.ttf')
  });

  useEffect(() => {
    const onLayoutRootView = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };

    onLayoutRootView();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

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
              <Link href="/" asChild>
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
