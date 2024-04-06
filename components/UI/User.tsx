import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@helpers/colors';
import { User } from 'iconsax-react-native';
import React from 'react';

type UIUserProps = {
  user: string;
  text: string;
};

export default function UIUser({ user, text }: UIUserProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <User color={Colors.Black} variant="Linear" size={24} />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.username}>{user}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GrayLightest,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18
  },
  avatarContainer: {
    backgroundColor: Colors.GrayLight,
    borderRadius: 9999,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    backgroundColor: Colors.Black,
    height: 20,
    width: 20,
    borderRadius: 9999
    // width: '100%',
    // height: '100%',
    // objectFit: 'cover'
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  username: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.Gray,
    lineHeight: 22
  },
  textContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.Gray
  }
});
