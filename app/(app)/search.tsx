import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@helpers/colors';
import Input from '@components/UI/Input';
import IconButton from '@components/UI/IconButton';
import User from '@components/UI/User';
import Group from '@components/UI/Group';

const DATA = [
  {
    id: 1,
    fullName: 'John Doe'
    // time:
    // avatar: 'https://randomuser.me/api/portraits
  }
];

export default function Search() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input value={value} placeholder="Search" onChangeText={(value) => setValue(value)} />
        <IconButton name="SearchNormal1" variant="Bold" color={Colors.White} size="large" />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollContainer}>
        <Group label="Results (1)">
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
                    <Text style={{ fontSize: 12, color: Colors.White }}>Add</Text>
                  </Pressable>
                </View>
              </User>
            ))}
          </View>
        </Group>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    padding: 16
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    gap: 12
  }
});
