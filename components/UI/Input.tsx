import { StyleSheet, TextInput } from 'react-native';
import { Colors } from '@helpers/colors';

type UIInputProps = {
  value: string;
  type?: 'text' | 'password';
  placeholder?: string;
  multiline?: boolean;
  onChangeText?: (value: string) => void;
};

export default function UIInput({ value, type = 'text', placeholder, multiline, onChangeText }: UIInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, !!value && styles.inputFocues]}
      multiline={multiline}
      secureTextEntry={type === 'password'}
      selectionColor={Colors.Gray}
      cursorColor={Colors.Gray}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={Colors.GrayLight}
    />
  );
}

const styles = StyleSheet.create({
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
