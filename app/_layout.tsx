import { View } from 'react-native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
// import { Text } from 'react-native';
// import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
// import { AuthProvider } from '@context/auth';

import { usePathname, useGlobalSearchParams, Slot } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  // For tracking
  useEffect(() => {
    console.log('pathname', pathname, 'params', params);
  }, [pathname, params]);

  if (!isFontLoaded && !fontError) {
    return null;
  }

  return (
    // <AuthProvider>
    // </AuthProvider>
    <View style={{ backgroundColor: 'red', flex: 1 }}>
      <Slot />
    </View>
  );
}
