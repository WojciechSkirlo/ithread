import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@context/auth';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@helpers/colors';
import UserService from '@services/User';
import User from '@components/UI/User';
import Label from '@components/UI/Label';
import UIButton from '@components/UI/Button';

export default function Account() {
  const [user, setUser] = useState({ username: '', email: '' });
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/sign-in');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.me();

        setUser({
          username: response.username,
          email: response.email
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Label>Profile</Label>
        <User user={user.username} text={user.email} />
      </View>
      <View style={styles.group}>
        <Label>Version</Label>
        <Text style={styles.version}>0.0.1</Text>
      </View>
      <UIButton text="Sign Out" onPress={handleSignOut} />
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
