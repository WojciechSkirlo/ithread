import { useEffect, useState } from 'react';
import { useAuth } from '@context/auth';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@helpers/colors';
import { User as IUser } from '@ts/index';
import UserService from '@services/User';
import Group from '@components/UI/Group';
import User from '@components/UI/User';
import Button from '@components/UI/Button';

export default function Requests() {
  const [requests, setRequests] = useState<IUser[]>([]);
  const { acceptRequest } = useAuth();

  const requestCount = requests.length;

  const handleClick = async (id: string) => {
    await acceptRequest(id).then();
    fetchData().then();
  };

  const fetchData = async () => {
    try {
      const response = await UserService.requests();
      setRequests(response.result || []);
    } catch (error) {
      console.log('errror');
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Group label={`Your friend request (${requestCount})`}>
          <View style={{ gap: 8 }}>
            {requests.map((item) => (
              <User key={item._id} header={item.name} description={item.email}>
                <Button text="Accept" size="small" onPress={() => handleClick(item._id)} />
              </User>
            ))}
          </View>
        </Group>
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
