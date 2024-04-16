import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@helpers/colors';
import { Conversation } from '@ts/index';
import UserService from '@services/User';
import UIUser from '@components/UI/User';
import UIGroup from '@components/UI/Group';
import NoFound from '@components/System/NoFound';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Conversation[]>([]);

  const resultsCount = results.length;

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await UserService.conversations();
      await new Promise((resolve) => setTimeout(resolve, 300));
      setResults(response.result || []);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size={32} color={Colors.GrayDark} />
        </View>
      ) : (
        <>
          {resultsCount ? (
            <ScrollView style={styles.scrollContainer}>
              <UIGroup label="Conversations">
                <View style={{ gap: 8 }}>
                  {results.map((item) => (
                    <Link href={`/(app)/chat?conversationId=${item._id}`} key={item._id} asChild>
                      <Pressable>
                        <UIUser header={item.participants[1].name} description={item.participants[1].email} />
                      </Pressable>
                    </Link>
                  ))}
                </View>
              </UIGroup>
            </ScrollView>
          ) : (
            <View style={styles.center}>
              <NoFound />
            </View>
          )}
        </>
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
