import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '@helpers/colors';
import Icon from '@components/UI/Icon';

type UIIconButtonProps = {
  name: string;
  color?: string;
  variant?: 'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone';
  size?: 'medium' | 'large';
  onPress?: () => void;
};

export default function UIIconButton({
  name,
  variant = 'Linear',
  color = Colors.Gray,
  size = 'medium',
  onPress
}: UIIconButtonProps) {
  return (
    <Pressable style={[styles.button, size === 'large' && styles.large]} onPress={onPress}>
      <Icon name={name} variant={variant} color={color} size={size === 'large' ? 24 : 20} />
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
