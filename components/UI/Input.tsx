import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Send2 } from 'iconsax-react-native';
import IconButton from '@components/IconButton';
import { Colors } from '@helpers/colors';

export default function Card() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        style={[styles.input, !!value && styles.inputFocues]}
        selectionColor={Colors.Gray}
        cursorColor={Colors.Gray}
        value={value}
        onChangeText={setValue}
      />
      <IconButton>
        <Send2 color={Colors.White} variant="Bold" size={24} />
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    gap: 12
  },
  input: {
    backgroundColor: Colors.White,
    minHeight: 52,
    maxHeight: 120,
    borderRadius: 10,
    borderColor: Colors.GrayLight,
    borderWidth: 1,
    color: Colors.GrayDark,
    padding: 12,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    fontSize: 16
  },
  inputFocues: {
    borderColor: Colors.Gray
  }
});
