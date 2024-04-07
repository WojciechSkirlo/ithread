import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@helpers/colors';
import { User as IUser } from '@ts/index';
import UserService from '@services/User';
import Input from '@components/UI/Input';
import IconButton from '@components/UI/IconButton';
import User from '@components/UI/User';
import Group from '@components/UI/Group';
import Button from '@components/UI/Button';
import NoFound from '@components/System/NoFound';

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounce(value, 500);
  const [results, setResults] = useState<IUser[]>([]);

  const resultsCount = results.length;

  const handleSendRequest = async (id: string) => {
    console.log(id);
    try {
      await UserService.sendRequest(id);
      // setIsLoading(true);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  const fetchData = async (query: string) => {
    try {
      setIsLoading(true);

      if (!query.length) {
        setResults([]);
        return;
      }

      const response = await UserService.search(query);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResults(response || []);
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
        <Input value={value} placeholder="Search" onChangeText={(value) => setValue(value)} />
        <IconButton name="SearchNormal1" variant="Bold" color={Colors.White} size="large" />
      </View>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size={32} color={Colors.GrayDark} />
        </View>
      ) : (
        <>
          {debouncedValue && resultsCount ? (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
              <Group label={`Results (${resultsCount})`}>
                <View style={{ gap: 8 }}>
                  {results.map((item) => (
                    <User key={item._id} header={item.name} description={item.email}>
                      <Button text="Add" size="small" onPress={() => handleSendRequest(item._id)} />
                    </User>
                  ))}
                </View>
              </Group>
            </ScrollView>
          ) : null}
          {debouncedValue && !resultsCount ? (
            <View style={styles.center}>
              <NoFound />
            </View>
          ) : null}
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
