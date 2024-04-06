import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@helpers/colors';
import { User } from 'iconsax-react-native';

type UIUserProps = {
  header: string;
  description: string;
  children?: ReactNode;
};

export default function UIUser({ header, description, children }: UIUserProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <User color={Colors.Black} variant="Linear" size={24} />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.header}>{header}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GrayLightest,
    borderRadius: 10,
    padding: 12,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18
  },
  avatarContainer: {
    backgroundColor: Colors.GrayLight,
    borderRadius: 9999,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    backgroundColor: Colors.Black,
    height: 20,
    width: 20,
    borderRadius: 9999
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.Gray,
    lineHeight: 22
  },
  descriptionContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.Gray
  }
});
