import { ActivityIndicator } from 'react-native';
import { Colors } from '@helpers/colors';

type UILoaderProps = {
  size?: number;
  color?: string;
};

export default function UILoader({ size = 32, color = Colors.GrayDark }: UILoaderProps) {
  return <ActivityIndicator size={size} color={color} />;
}
