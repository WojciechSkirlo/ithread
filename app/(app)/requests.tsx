import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@helpers/colors';
import Group from '@components/UI/Group';
import User from '@components/UI/User';
import React from 'react';

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
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Pressable
                    style={{
                      backgroundColor: Colors.GrayDark,
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                      borderRadius: 9999
                    }}
                  >
                    <Text style={{ fontSize: 12, color: Colors.White }}>Accept</Text>
                  </Pressable>
                </View>
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
