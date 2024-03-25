import { useAuth } from '@context/auth';
import { Pressable } from 'react-native';
import { Redirect, Stack, Link } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import { Colors } from '@helpers/colors';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
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
