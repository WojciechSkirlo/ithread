import { useEffect, useState } from 'react';
import { useAuth } from '@context/auth';
import { Animated, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@helpers/colors';
import { Conversation, SimpleUser } from '@ts/index';
import UserService from '@services/User';
import UIUser from '@components/UI/User';
import UIGroup from '@components/UI/Group';
import UILoader from '@components/UI/Loader';
import SystemNoFound from '@components/System/NoFound';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Conversation[]>([]);
  const [opacity] = useState(new Animated.Value(0));
  const { user } = useAuth();

  const resultsCount = results.length;

  const conversationUser = (participants: SimpleUser[]) => {
    if (!user) return null;

    return participants.find((item) => item._id !== user._id);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await UserService.conversations();
      await new Promise((resolve) => setTimeout(resolve, 200));
      setResults(response.result || []);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.center}>
          <UILoader />
        </View>
      ) : (
        <Animated.View style={{ opacity, flex: 1 }}>
          {resultsCount ? (
            <ScrollView style={styles.scrollContainer}>
              <UIGroup label="Conversations">
                <View style={{ gap: 8 }}>
                  {results.map((item) => (
                    <Link href={`/(app)/chat?conversationId=${item._id}`} key={item._id} asChild>
                      <Pressable>
                        <UIUser
                          header={conversationUser(item.participants)?.name ?? '-'}
                          description={conversationUser(item.participants)?.email ?? '-'}
                        />
                      </Pressable>
                    </Link>
                  ))}
                </View>
              </UIGroup>
            </ScrollView>
          ) : (
            <View style={styles.center}>
              <SystemNoFound text="No conversations started" />
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    backgroundColor: Colors.White,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    paddingTop: 8
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
