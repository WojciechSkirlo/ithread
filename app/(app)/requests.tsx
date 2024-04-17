import { useEffect, useState } from 'react';
import { useAuth } from '@context/auth';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '@helpers/colors';
import { User } from '@ts/index';
import UserService from '@services/User';
import UIGroup from '@components/UI/Group';
import UIUser from '@components/UI/User';
import UIButton from '@components/UI/Button';
import SystemNoFound from '@components/System/NoFound';

export default function Requests() {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<User[]>([]);
  const { acceptRequest } = useAuth();

  const requestCount = requests.length;

  const handleClick = async (id: string) => {
    await acceptRequest(id).then();
    fetchData().then();
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await UserService.requests();
      await new Promise((resolve) => setTimeout(resolve, 300));
      setRequests(response.result || []);
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
          {requestCount ? (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
              <UIGroup label={`Your friend request (${requestCount})`}>
                <View style={{ gap: 8 }}>
                  {requests.map((item) => (
                    <UIUser key={item._id} header={item.name} description={item.email}>
                      <UIButton text="Accept" size="small" onPress={() => handleClick(item._id)} />
                    </UIUser>
                  ))}
                </View>
              </UIGroup>
            </ScrollView>
          ) : (
            <View style={styles.center}>
              <SystemNoFound text="No friend requests found" />
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
