import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@helpers/colors';

type MessageProps = {
  me: boolean;
  text: string;
  date?: string;
};

export default function Message({ me, text }: MessageProps) {
  return (
    <View style={[styles.container, me ? styles.right : styles.left]}>
      <Text style={[styles.message, me ? styles.rightMessage : styles.leftMessage]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    minWidth: 50,
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
