import { Text, StyleSheet, View } from 'react-native';
import Stack from './components/navigation/Stack';
import BottomTab from './components/navigation/BottomTab';

export default function App() {
  return (
    <View style={styles.container}>
      <Stack />
      <View style={styles.main}>
        <Text>asdasda</Text>
      </View>
      <BottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});
