import { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@helpers/colors';

type MessageProps = {
  sender: 'me' | 'friend';
  children: ReactNode;
};

export default function Message({ sender, children }: MessageProps) {
  return (
    <View style={[styles.container, sender === 'me' ? styles.right : styles.left]}>
      <Text style={[styles.message, sender === 'me' ? styles.rightMessage : styles.leftMessage]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    minWidth: 120,
    maxWidth: '80%'
  },
  left: {
    backgroundColor: Colors.GrayLightest,
    alignSelf: 'flex-start',
    borderTopStartRadius: 0,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10
  },
  right: {
    backgroundColor: Colors.GrayDark,
    alignSelf: 'flex-end',
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14
  },
  leftMessage: {
    color: Colors.Gray
  },
  rightMessage: {
    color: Colors.White
  }
});
