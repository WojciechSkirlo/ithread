import { useRouter } from 'expo-router';
import { useAuth } from '@context/auth';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@helpers/colors';
import Constants from 'expo-constants';
import UIGroup from '@components/UI/Group';
import UIUser from '@components/UI/User';
import UIButton from '@components/UI/Button';

export default function Account() {
  const { signOut, user } = useAuth();
  const router = useRouter();
  const version = Constants.expoConfig?.version;

  const handleSignOut = () => {
    signOut();
    router.push('/sign-in');
  };

  return (
    <View style={styles.container}>
      <UIGroup label="Profile">
        <UIUser header={user?.name ?? ''} description={user?.email ?? ''} />
      </UIGroup>
      {version ? (
        <UIGroup label="Version">
          <Text style={styles.version}>{version}</Text>
        </UIGroup>
      ) : null}
      <UIButton text="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: Colors.White,
    flex: 1,
    gap: 16
  },
  version: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.Gray
  }
});
