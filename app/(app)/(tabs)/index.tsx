import { useEffect } from 'react';
import { StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@helpers/colors';
import Label from '@components/UI/Label';
import User from '@components/UI/User';

const DATA = [
  {
    id: '1',
    fullName: 'Shawn Samson',
    message: 'Hi! Can you show your homework? asda sdoj asdij aosi djojasdij asiod',
    avatar: require('@assets/img/avatar.png')
  },
  {
    id: '2',
    fullName: 'Amanda',
    message: 'Hello there',
    avatar: require('@assets/img/avatar.png')
  },
  {
    id: '3',
    fullName: 'John Doe',
    message: 'Hello! how may I help you today?',
    avatar: require('@assets/img/avatar.png')
  },
  {
    id: '4',
    fullName: 'Tina',
    message: 'What is the meaning of “Serendipity”?',
    avatar: require('@assets/img/avatar.png')
  },
  {
    id: '5',
    fullName: 'Shawn Samson',
    message: 'Hi! Can you show your homework? asda sdoj asdij aosi djojasdij asiod',
    avatar: require('@assets/img/avatar.png')
  },
  {
    id: '6',
    fullName: 'Amanda',
    message: 'Hello there',
    avatar: require('@assets/img/avatar.png')
  },
  {
    id: '7',
    fullName: 'John Doe',
    message: 'Hello! how may I help you today?',
    avatar: require('@assets/img/avatar.png')
  },
  {
    id: '8',
    fullName: 'Tina',
    message: 'What is the meaning of “Serendipity”?',
    avatar: require('@assets/img/avatar.png')
  }
];

export default function Home() {
  useEffect(() => {
    console.log('Home screen mounted');
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Label>Friends</Label>
        <View style={{ gap: 8 }}>
          {DATA.map((item) => (
            <Link href="/(app)/chat" key={item.id} asChild>
              <Pressable>
                <User user={item.fullName} text={item.message} />
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 4,
    backgroundColor: Colors.White,
    flex: 1
  }
});
