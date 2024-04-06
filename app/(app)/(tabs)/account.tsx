import { Link, useRouter } from 'expo-router';
import { useAuth } from '@context/auth';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@helpers/colors';
import Constants from 'expo-constants';
import FormGroup from '@components/UI/FormGroup';
import User from '@components/UI/User';
import Button from '@components/UI/Button';

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
      <FormGroup label="Profile">
        <User user={user?.username ?? ''} text={user?.email ?? ''} />
      </FormGroup>
      {version ? (
        <FormGroup label="Version">
          <Text style={styles.version}>{version}</Text>
        </FormGroup>
      ) : null}
      <Button text="Sign Out" onPress={handleSignOut} />
      <Link href="/sign-in">Test</Link>
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
