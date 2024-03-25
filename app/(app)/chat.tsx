import { useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Message as IMessage } from '@ts/index';
import { Send2 } from 'iconsax-react-native';
import { Colors } from '@helpers/colors';
import Message from '@components/Message';
import UIInput from '@components/UI/Input';
import UIIconButton from '@components/UI/IconButton';

const DATA: Array<IMessage> = [
  {
    id: '1',
    text: 'Hello there',
    sender: 'me'
  },
  {
    id: '2',
    text: 'Hello! how may I help you today?',
    sender: 'friend'
  },
  {
    id: '3',
    text: 'What is the meaning of “Serendipity”?',
    sender: 'me'
  },
  {
    id: '4',
    text: '"Serendipity" refers to the occurrence of fortunate or valuable discoveries or events by chance, which are not originally sought after or anticipated. It describes the experience of stumbling upon something valuable or finding something desirable while searching for something else entirely. It can refer to a combination of luck, intuition,',
    sender: 'friend'
  },
  {
    id: '5',
    text: '"Serendipity" refers to the occurrence of fortunate or valuable discoveries or events by chance, which are not originally sought after or anticipated. It describes the experience of stumbling upon something valuable or finding something desirable while searching for something else entirely. It can refer to a combination of luck, intuition,',
    sender: 'me'
  },
  {
    id: '6',
    text: 'What is the meaning of “Serendipity”?',
    sender: 'me'
  },
  {
    id: '7',
    text: 'Hello! how may I help you today?',
    sender: 'friend'
  },
  {
    id: '8',
    text: 'Hello there',
    sender: 'me'
  }
];

export default function Chat() {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  return (
    <>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          {DATA.map((message) => (
            <Message sender={message.sender} key={message.id}>
              {message.text}
            </Message>
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <UIInput value="" />
        <UIIconButton>
          <Send2 color={Colors.White} variant="Bold" size={24} />
        </UIIconButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.White,
    flex: 1,
    gap: 12
  },
  inputContainer: {
    padding: 16,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    gap: 12
  }
});
