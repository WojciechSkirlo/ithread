import { useAuth } from '@context/auth';
import { Redirect, Stack } from 'expo-router';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors } from '@helpers/colors';
import UIBackButton from '@components/UI/BackButton';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  const options: NativeStackNavigationOptions = {
    headerTitleStyle: {
      fontFamily: 'Poppins-Medium',
      fontSize: 18
    },
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.White
    },
    headerShadowVisible: false,
    headerLeft: ({ canGoBack }) => canGoBack && <UIBackButton />
  };

  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{
          headerTitle: 'Chat',
          ...options
        }}
      />
      <Stack.Screen
        name="requests"
        options={{
          headerTitle: 'Friend requests',
          ...options
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerTitle: 'Search friends',
          ...options
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
