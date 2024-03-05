import { StyleSheet, View } from 'react-native';
import { MessageText, User, Element4 } from 'iconsax-react-native';

export default function BottomTab() {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <MessageText color="#383838" variant="Linear" size={24} />
      </View>
      <View style={styles.navigation}>
        <Element4 color="#383838" variant="Bold" size={24} />
      </View>
      {/* <View style={styles.navigation}>
        <Clock color="#383838" variant="Linear" size={24} />
      </View> */}
      <View style={styles.navigation}>
        <User color="#383838" variant="Linear" size={24} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    backgroundColor: '#fff',
    borderTopColor: '#383838',
    borderBottomColor: '#383838',
    shadowColor: '#000', // Shadow color from Figma
    shadowOffset: { width: 0, height: 4 }, // Adjust based on Figma
    shadowOpacity: 0.08, // Adjust based on Figma
    shadowRadius: 0, // Adjust based on Figma,
    elevation: 20
  },
  navigation: {
    padding: 10
  }
});
