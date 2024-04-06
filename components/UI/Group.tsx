import { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@helpers/colors';
import Label from '@components/UI/Label';

type UIGroupProps = {
  label?: string;
  error?: string;
  children: ReactNode;
};

export default function UIGroup({ label, error, children }: UIGroupProps) {
  return (
    <View>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    marginTop: 2,
    marginLeft: 2,
    color: Colors.Red,
    fontSize: 12
  }
});
