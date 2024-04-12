import { useEffect } from 'react';
import { StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@helpers/colors';
import User from '@components/UI/User';
import Group from '@components/UI/Group';

const DATA = [
  {
    id: '1',
    fullName: 'Shawn Samson',
    message: 'Hi! Can you show your homework? asda sdoj asdij aosi djojasdij asiod'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '2',
    fullName: 'Amanda',
    message: 'Hello there'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '3',
    fullName: 'John Doe',
    message: 'Hello! how may I help you today?'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '4',
    fullName: 'Tina',
    message: 'What is the meaning of “Serendipity”?'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '5',
    fullName: 'Shawn Samson',
    message: 'Hi! Can you show your homework? asda sdoj asdij aosi djojasdij asiod'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '6',
    fullName: 'Amanda',
    message: 'Hello there'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '7',
    fullName: 'John Doe',
    message: 'Hello! how may I help you today?'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '8',
    fullName: 'Tina',
    message: 'What is the meaning of “Serendipity”?'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '9',
    fullName: 'Shawn Samson',
    message: 'Hi! Can you show your homework? asda sdoj asdij aosi djojasdij asiod'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '10',
    fullName: 'Amanda',
    message: 'Hello there'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '11',
    fullName: 'John Doe',
    message: 'Hello! how may I help you today?'
    // avatar: require('@assets/img/avatar.png')
  },
  {
    id: '12',
    fullName: 'Tina',
    message: 'What is the meaning of “Serendipity”?'
    // avatar: require('@assets/img/avatar.png')
  }
];

export default function Home() {
  useEffect(() => {
    console.log('Home screen mounted');
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Group label="Conversations">
          <View style={{ gap: 8 }}>
            {DATA.map((item) => (
              <Link href="/(app)/chat" key={item.id} asChild>
                <Pressable>
                  <User header={item.fullName} description={item.message} />
                </Pressable>
              </Link>
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
