import { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@helpers/colors';

type UIFormGroupProps = {
  error: string;
  children: ReactNode;
};

export default function UIFormGroup({ error, children }: UIFormGroupProps) {
  return (
    <View>
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
