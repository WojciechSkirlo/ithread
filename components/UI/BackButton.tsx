import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@helpers/colors';
import UIIcon from '@components/UI/Icon';

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
      <UIIcon name="ArrowLeft" color={Colors.GrayDark} variant="Linear" size={24} />
    </Pressable>
  );
}
