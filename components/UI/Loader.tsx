import { ActivityIndicator } from 'react-native';
import { Colors } from '@helpers/colors';

export default function UILoader() {
  return <ActivityIndicator size={32} color={Colors.GrayDark} />;
}
