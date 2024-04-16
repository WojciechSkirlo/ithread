import { useEffect, useRef, useState } from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@context/auth';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Message } from '@ts/index';
import socket from '../../socket';
import { Colors } from '@helpers/colors';
import UIMessage from '@components/Message';
import UIInput from '@components/UI/Input';
import UIIconButton from '@components/UI/IconButton';

export default function Chat() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Array<Message>>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  const sendMessage = async () => {
    const data = { senderId: user._id, conversationId: '', text: value };

    socket.emit('sendMessage', data);
    setValue('');
  };

  useEffect(() => {
    // console.log('conversationId', conversationId);
    // if (scrollViewRef.current) {
    //   scrollViewRef.current.scrollToEnd({ animated: true });
    // }

    socket.emit('joinConversation', conversationId);

    socket.on('message', (message: Message) => {
      setMessages([...messages, message]);
      console.log('message :)', message);
    });

    socket.on('messages', (messages: Array<Message>) => {
      setMessages(messages);
    });
  }, []);

  return (
    <>
      <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>
        <View style={styles.container}>
          {messages.map((message) => (
            <UIMessage key={message._id} me={message.sender === user._id} text={message.text} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <UIInput value={value} onChangeText={(value) => setValue(value)} />
        <UIIconButton name="Send2" variant="Bold" color={Colors.White} size="large" onPress={() => sendMessage()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.White
  },
  container: {
    padding: 16,
    flex: 1,
    gap: 12,
    justifyContent: 'flex-end'
  },
  inputContainer: {
    padding: 16,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    gap: 12
  }
});
