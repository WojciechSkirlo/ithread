import { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@context/auth';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Message } from '@ts/index';
import socket from '../../socket';
import { Colors } from '@helpers/colors';
import UIMessage from '@components/UI/Message';
import UIInput from '@components/UI/Input';
import UIIconButton from '@components/UI/IconButton';

export default function Chat() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Array<Message>>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const { user } = useAuth();

  const sendMessage = async () => {
    if (!value || !user) return;
    const data = { senderId: user._id, conversationId, text: value };

    socket.emit('sendMessage', data);
    setValue('');
  };

  useEffect(() => {
    socket.emit('joinConversation', conversationId);

    socket.on('newMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    });

    socket.on('loadMessages', (_messages: Array<Message>) => {
      setMessages(_messages);
    });

    return () => {
      socket.emit('leaveConversation', conversationId);
      socket.off('newMessage');
      socket.off('loadMessages');
    };
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }} ref={scrollViewRef}>
        <View style={styles.container}>
          {messages.map((message) => (
            <UIMessage
              key={message._id}
              me={message.senderId === user?._id}
              text={message.text}
              date={message.timestamp}
            />
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
    backgroundColor: Colors.White
  },
  container: {
    padding: 16,
    flexGrow: 1,
    gap: 12,
    justifyContent: 'flex-end'
  },
  inputContainer: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    gap: 12
  }
});
