import { Pressable } from 'react-native';
import { Colors } from '@helpers/colors';
import { ArrowLeft } from 'iconsax-react-native';
import { Link } from 'expo-router';

type UIBackButtonProps = {
  href?: string;
};

export default function UIBackButton({ href = '/' }: UIBackButtonProps) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <ArrowLeft color={Colors.GrayDark} variant="Linear" size={24} />
      </Pressable>
    </Link>
  );
}
