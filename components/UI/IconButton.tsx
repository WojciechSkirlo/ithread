import { ReactNode } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors } from '@helpers/colors';

type UIIconButtonProps = {
  children: ReactNode;
};

export default function UIIconButton({ children }: UIIconButtonProps) {
  return <Pressable style={styles.button}>{children}</Pressable>;
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: Colors.Black,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    fontSize: 16
  }
});
