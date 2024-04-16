import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@helpers/colors';
import Icon from '@components/UI/Icon';

export default function SystemNoFound() {
  return (
    <View style={styles.container}>
      <Icon name="SearchStatus" size={28} />
      <Text style={styles.title}>No results found</Text>
      {/*<Text style={styles.description}>Try again with different query</Text>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    marginTop: 8,
    color: Colors.Gray
  },
  description: {
    marginTop: 2,
    color: Colors.Accent
  }
});
