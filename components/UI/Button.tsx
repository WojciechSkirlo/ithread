import { StyleSheet, Pressable, Text } from 'react-native';
import { Colors } from '@helpers/colors';

type UIButtonProps = {
  text: string;
  disabled?: boolean;
  onPress?: () => void;
};

export default function UIButton({ text, disabled, onPress }: UIButtonProps) {
  return (
    <Pressable style={[styles.button]} disabled={disabled} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: Colors.Black,
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    fontSize: 16
  },
  text: {
    color: Colors.White,
    fontSize: 14,
    fontWeight: '500'
  }
});
