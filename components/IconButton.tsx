import { ReactNode } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors } from '@helpers/colors';

type IconButtonProps = {
  children: ReactNode;
};

export default function IconButton({ children }: IconButtonProps) {
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
