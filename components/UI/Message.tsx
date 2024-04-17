import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@helpers/colors';

type UIMessageProps = {
  me: boolean;
  text: string;
  date: string;
};

const formatDate = (date: string) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours12}:${minutesString} ${ampm}`;
};

export default function UIMessage({ me, text, date }: UIMessageProps) {
  return (
    <View style={[styles.container, me ? styles.right : styles.left]}>
      <Text style={[styles.message, me ? styles.rightMessage : styles.leftMessage]}>{text}</Text>
      <Text style={[styles.date, me ? styles.rightDate : styles.leftDate]}>{formatDate(date)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingVertical: 10,
    maxWidth: '70%'
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
    textAlign: 'left',
    color: Colors.Gray
  },
  rightMessage: {
    textAlign: 'right',
    color: Colors.White
  },
  date: {
    fontSize: 9
  },
  leftDate: {
    textAlign: 'left',
    color: Colors.Gray
  },
  rightDate: {
    textAlign: 'right',
    color: Colors.GrayLight
  }
});
