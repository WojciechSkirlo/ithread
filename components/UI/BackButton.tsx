import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@helpers/colors';
import { ArrowLeft } from 'iconsax-react-native';

type UIBackButtonProps = {
  href?: string;
};

export default function UIBackButton({ href = '/' }: UIBackButtonProps) {
  const onPress = () => {
    const canGoBack = router.canGoBack();
    canGoBack ? router.back() : router.push(href);
  };

  return (
    <Pressable onPress={onPress}>
      <ArrowLeft color={Colors.GrayDark} variant="Linear" size={24} />
    </Pressable>
  );
}
