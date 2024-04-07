import { Colors } from '@helpers/colors';
import type { Icon as IconType } from 'iconsax-react-native';
import * as Icons from 'iconsax-react-native';

type UIIconProps = {
  name: string;
  color?: string;
  variant?: 'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone';
  size?: number;
  onPress?: () => void;
};

export default function UIIcon({ name, variant = 'Linear', color = Colors.Gray, size = 24 }: UIIconProps) {
  const Icon: IconType = (Icons as any)[name];

  return <Icon variant={variant} color={color} size={size} />;
}
