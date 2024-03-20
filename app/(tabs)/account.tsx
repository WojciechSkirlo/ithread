import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@helpers/colors';
import User from '@components/User';
import Label from '@components/UI/Label';

export default function Account() {
  return (
    <View style={styles.container}>
      <Label>Profile</Label>
      <View style={{ marginBottom: 16 }}>
        <User name={'Shawn Samson'} message={'shawnsamson@gmail.com'} />
      </View>
      <Label>Version</Label>
      <Text style={styles.version}>0.0.1</Text>
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
