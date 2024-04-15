import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// import { Link } from 'expo-router';
import { Colors } from '@helpers/colors';
// import UserService from '@services/User';
// import ConversationService from '@services/Conversation';
// import UIUser from '@components/UI/User';
import UIGroup from '@components/UI/Group';

export default function Home() {
  // const [setIsLoading] = useState(false);
  // const [results, setResults] = useState<any[]>([]);

  const fetchData = async () => {
    // try {
    //   setIsLoading(true);
    //
    //   const response = await ConversationService.getConversations();
    //
    //   console.log("response", response);
    //   // await new Promise((resolve) => setTimeout(resolve, 500));
    //   // setResults(response.result || []);
    // } catch (error) {
    //   setIsLoading(false);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <UIGroup label="Conversations">
          <View style={{ gap: 8 }}>
            {/*{results.map((item) => (*/}
            {/*  <Link href="/(app)/chat" key={item.id} asChild>*/}
            {/*    <Pressable>*/}
            {/*      <UIUser header={item.fullName} description={item.message} />*/}
            {/*    </Pressable>*/}
            {/*  </Link>*/}
            {/*))}*/}
          </View>
        </UIGroup>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.White
  },
  container: {
    padding: 16,
    paddingTop: 8
  }
});
