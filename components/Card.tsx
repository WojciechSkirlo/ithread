import { StyleSheet, View, Text } from 'react-native';
import { Book1 } from 'iconsax-react-native';
import { Colors } from '@helpers/colors';

type CardProps = {
  title: string;
  description: string;
};

export default function Card({ title, description }: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Book1 color={'#66B2E9'} variant="Linear" size={24} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.GrayLightest,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 16,
    paddingTop: 16,
    flex: 1
  },
  iconContainer: {
    backgroundColor: 'rgba(102, 178, 233, 0.15)',
    padding: 10,
    borderRadius: 9999,
    alignSelf: 'flex-start',
    marginBottom: 12
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginBottom: 6,
    color: Colors.GrayDark
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.Gray
  }
});
