import { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

type LabelProps = {
  children: ReactNode;
};

export default function Label({ children }: LabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  }
});
