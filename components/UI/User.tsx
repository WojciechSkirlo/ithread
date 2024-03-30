import { StyleSheet, View, Text, Image } from 'react-native';
import { Colors } from '@helpers/colors';

type UIUserProps = {
  user: string;
  text: string;
};

export default function UIUser({ user, text }: UIUserProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={require('@assets/img/avatar.png')} />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.username}>{user}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GrayLightest,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 16,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18
  },
  avatarContainer: {
    backgroundColor: 'rgba(102, 178, 233, 0.15)',
    borderRadius: 9999,
    height: 50,
    width: 50
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  username: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.Gray,
    lineHeight: 22
  },
  textContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.Gray
  }
});
