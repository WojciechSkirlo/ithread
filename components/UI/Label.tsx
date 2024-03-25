import { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

type UILabelProps = {
  children: ReactNode;
};

export default function UILabel({ children }: UILabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  }
});
