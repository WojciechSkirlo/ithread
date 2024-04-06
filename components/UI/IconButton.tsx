import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '@helpers/colors';
import type { Icon as IconType } from 'iconsax-react-native';
import * as Icons from 'iconsax-react-native';

type UIIconButtonProps = {
  name: string;
  color?: string;
  variant?: 'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone';
  size?: 'medium' | 'large';
};

export default function UIIconButton({
  name,
  variant = 'Linear',
  color = Colors.Gray,
  size = 'medium'
}: UIIconButtonProps) {
  const Icon: IconType = (Icons as any)[name];

  return (
    <Pressable style={[styles.button, size === 'large' && styles.large]}>
      <Icon variant={variant} color={color} size={size === 'large' ? 24 : 20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: Colors.Black,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999
  },
  large: {
    width: 50,
    height: 50
  }
});
