import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { ScrollView, StyleSheet, View } from 'react-native';
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

  const fetchData = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await UserService.search(query);
      console.log('Respeonse', response);
      setResults(response);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedValue.length > 1) {
      fetchData(debouncedValue).then();
    }
  }, [debouncedValue]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input value={value} placeholder="Search" onChangeText={(value) => setValue(value)} />
        <IconButton name="SearchNormal1" variant="Bold" color={Colors.White} size="large" />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollContainer}>
        {isLoading ? null : (
          <>
            {value && results.length ? (
              <Group label={`Results (${resultsCount})`}>
                <View style={{ gap: 8 }}>
                  {results.map((item) => (
                    <User key={item._id} header={item.name} description={item.email}>
                      <Button text="Add" size="small" />
                    </User>
                  ))}
                </View>
              </Group>
            ) : null}
            {value && !results.length ? <NoFound /> : null}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    padding: 16
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    gap: 12
  }
});
