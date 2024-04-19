import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useAuth } from '@context/auth';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@helpers/colors';
import { User as IUser } from '@ts/index';
import UserService from '@services/User';
import UIInput from '@components/UI/Input';
import UIIconButton from '@components/UI/IconButton';
import UIUser from '@components/UI/User';
import UIGroup from '@components/UI/Group';
import UIButton from '@components/UI/Button';
import UILoader from '@components/UI/Loader';
import SystemNoFound from '@components/System/NoFound';

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounce(value, 500);
  const [results, setResults] = useState<IUser[]>([]);
  const [opacity] = useState(new Animated.Value(0));
  const { user, sendRequest } = useAuth();

  const resultsCount = results.length;

  const handleClick = async (id: string) => {
    if (isFriends(id)) return;
    if (isSentRequest(id)) return;

    sendRequest(id).then();
  };

  const isFriends = (id: string) => {
    if (user?.friends) {
      return user.friends.some((friend_id) => friend_id == id);
    }

    return false;
  };

  const isSentRequest = (id: string) => {
    if (user?.sentRequests) {
      return user.sentRequests.some((request_id) => request_id == id);
    }

    return false;
  };

  const status = (id: string) => {
    if (isFriends(id)) return 'Friend';
    if (isSentRequest(id)) return 'Request sent';

    return 'Add friend';
  };

  const fetchData = async (query: string) => {
    try {
      setIsLoading(true);

      if (!query.length) {
        setResults([]);
        return;
      }

      const response = await UserService.search(query);
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
          <UILoader />
        </View>
      ) : (
        <Animated.View style={{ opacity, flex: 1 }}>
          {debouncedValue && resultsCount ? (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
              <UIGroup label={`Results (${resultsCount})`}>
                <View style={{ gap: 8 }}>
                  {results.map((item) => (
                    <UIUser key={item._id} header={item.name} description={item.email}>
                      <UIButton text={status(item._id)} size="small" onPress={() => handleClick(item._id)} />
                    </UIUser>
                  ))}
                </View>
              </UIGroup>
            </ScrollView>
          ) : null}
          {debouncedValue && !resultsCount ? (
            <View style={styles.center}>
              <SystemNoFound />
            </View>
          ) : null}
        </Animated.View>
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
