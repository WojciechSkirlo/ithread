import { StyleSheet, View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={styles.testone}>Tab Home</Text>
      <Text style={styles.testtwo}>Tab Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  testone: {
    color: 'red',
    fontFamily: 'Poppins-Semibold',
    fontSize: 24
  },
  testtwo: {
    color: 'blue'
  }
});
