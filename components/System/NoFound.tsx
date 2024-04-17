import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@helpers/colors';
import Icon from '@components/UI/Icon';

type SystemNoFoundProps = {
  text?: string;
  description?: string;
};

export default function SystemNoFound({ text = 'No results found', description }: SystemNoFoundProps) {
  return (
    <View style={styles.container}>
      <Icon name="SearchStatus" size={28} />
      <Text style={styles.title}>{text}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    marginTop: 8,
    color: Colors.Gray,
    // maxWidth: 150,
    textAlign: 'center'
  },
  description: {
    marginTop: 2,
    color: Colors.Accent
  }
});
