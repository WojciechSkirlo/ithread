import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { Slot } from 'expo-router';
import axios from 'axios';
import { AuthProvider } from '@context/auth';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

export default function HomeLayout() {
  const [isFontLoaded, fontError] = useFonts({
    'Poppins-Light': require('@assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Semibold': require('@assets/fonts/Poppins-SemiBold.ttf')
  });

  useEffect(() => {
    const onLayoutRootView = async () => {
      if (isFontLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };

    onLayoutRootView();
  }, [isFontLoaded, fontError]);

  if (!isFontLoaded && !fontError) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
