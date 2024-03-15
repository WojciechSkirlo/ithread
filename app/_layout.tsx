import { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
