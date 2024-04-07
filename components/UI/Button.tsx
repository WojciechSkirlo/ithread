import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '@helpers/colors';

type UIButtonProps = {
  text: string;
  disabled?: boolean;
  size?: 'small' | 'large';
  onPress?: () => void;
};

export default function UIButton({ text, disabled, size = 'large', onPress }: UIButtonProps) {
  return (
    <Pressable style={[styles.button, size === 'large' && styles.buttonLarge]} disabled={disabled} onPress={onPress}>
      <Text style={[styles.text, size === 'large' && styles.textLarge]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: Colors.Black,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLarge: {
    width: '100%',
    height: 50,
    borderRadius: 10
  },
  text: {
    color: Colors.White,
    fontSize: 12
  },
  textLarge: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});
