import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@helpers/colors';
import User from '@components/User';
import Label from '@components/UI/Label';
import UIButton from '@components/UI/Button';

export default function Account() {
  const router = useRouter();

  const signOut = () => {
    router.push('/sign-in');
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        <Label>Profile</Label>
        <User name={'Shawn Samson'} message={'shawnsamson@gmail.com'} />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Label>Version</Label>
        <Text style={styles.version}>0.0.1</Text>
      </View>
      <UIButton text="Sign Out" onPress={signOut} />
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
  version: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.Gray
  }
});
