import { Link, useRouter } from 'expo-router';
import { useAuth } from '@context/auth';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@helpers/colors';
import Constants from 'expo-constants';
import User from '@components/UI/User';
import Label from '@components/UI/Label';
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
      <View style={styles.group}>
        <Label>Profile</Label>
        <User user={user?.username ?? ''} text={user?.email ?? ''} />
      </View>
      {version ? (
        <View style={styles.group}>
          <Label>Version</Label>
          <Text style={styles.version}>{version}</Text>
        </View>
      ) : null}
      <UIButton text="Sign Out" onPress={handleSignOut} />

      <Link href="/sign-in">Test</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 4,
    backgroundColor: Colors.White,
    flex: 1
  },
  group: {
    marginBottom: 16
  },
  version: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.Gray
  }
});
