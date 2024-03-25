import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@context/auth';
import { Text } from 'react-native';
import { usePathname, useGlobalSearchParams, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
  const [isFontLoaded, fontError] = useFonts({
    'Poppins-Light': require('@assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Semibold': require('@assets/fonts/Poppins-SemiBold.ttf')
  });

  // For tracking
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  useEffect(() => {
    const onLayoutRootView = async () => {
      if (isFontLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };

    onLayoutRootView();
  }, [isFontLoaded, fontError]);

  //  For tracking
  useEffect(() => {
    console.log('pathname', pathname, 'params', params);
  }, [pathname, params]);

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
