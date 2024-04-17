import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@helpers/colors';
import { User as IUser } from '@ts/index';
import UserService from '@services/User';
import UIInput from '@components/UI/Input';
import UIButton from '@components/UI/Button';
import UIIconButton from '@components/UI/IconButton';
import UIGroup from '@components/UI/Group';
import UIUser from '@components/UI/User';
import SystemNoFound from '@components/System/NoFound';

export default function Friends() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedValue] = useDebounce(value, 500);
  const [results, setResults] = useState<IUser[]>([]);
  const router = useRouter();

  const resultsCount = results.length;

  const handleClick = async (id: string) => {
    try {
      const response = await UserService.startConversation(id);
      const conversationId = response.result._id;

      conversationId && router.push(`/(app)/chat?conversationId=${conversationId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (query: string) => {
    try {
      setIsLoading(true);

      const response = await UserService.friends(query);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setResults(response.result || []);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(debouncedValue).then();
  }, [debouncedValue]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <UIInput value={value} placeholder="Search" onChangeText={(value) => setValue(value)} />
        <UIIconButton name="SearchNormal1" variant="Bold" color={Colors.White} size="large" />
      </View>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size={32} color={Colors.GrayDark} />
        </View>
      ) : (
        <>
          {resultsCount ? (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
              <UIGroup label={`Results (${resultsCount})`}>
                <View style={{ gap: 8 }}>
                  {results.map((item) => (
                    <UIUser key={item._id} header={item.name} description={item.email}>
                      <UIButton text="Chat" size="small" onPress={() => handleClick(item._id)} />
                    </UIUser>
                  ))}
                </View>
              </UIGroup>
            </ScrollView>
          ) : (
            <View style={styles.center}>
              <SystemNoFound text="No friends found" description="Click '+' to add some" />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    gap: 12
  }
});
