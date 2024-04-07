import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@helpers/colors';
import Group from '@components/UI/Group';
import User from '@components/UI/User';
import Button from '@components/UI/Button';

const DATA = [
  {
    id: 1,
    fullName: 'John Doe'
    // time:
    // avatar: 'https://randomuser.me/api/portraits
  }
];

export default function Requests() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Group label="Your friend request (1)">
          <View style={{ gap: 8 }}>
            {DATA.map((item) => (
              <User key={item.id} header={`${item.fullName}`} description={'2h ago'}>
                <Button text="Accept" size="small" />
              </User>
            ))}
          </View>
        </Group>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.White
  },
  container: {
    padding: 16,
    paddingTop: 8
  }
});
