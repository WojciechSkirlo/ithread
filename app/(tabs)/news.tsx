import { StyleSheet, View, Pressable, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@helpers/colors';
import Card from '@components/Card';
import Label from '@components/UI/Label';

const DATA = [
  {
    id: '1',
    title: 'Write an Article',
    description: 'Generate well-written articles on any topic you want.'
  },
  {
    id: '2',
    title: 'Academic Writer',
    description: 'Generate educational writing such as eassys, reports, etc.'
  },
  {
    id: '3',
    title: 'Songs/Lyrics',
    description: 'Generate well-written articles on any topic you want.'
  },
  {
    id: '4',
    title: 'Story Teller',
    description: 'Generate educationalwriting such as eassys, reports, etc.'
  },
  {
    id: '5',
    title: 'Story Teller',
    description: 'Generate educationalwriting such as eassys, reports, etc.'
  }
];

export default function News() {
  return (
    <View style={styles.container}>
      <Label>Updates</Label>
      <FlatList
        data={DATA}
        numColumns={2}
        contentContainerStyle={{ gap: 8 }}
        columnWrapperStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <Link style={{ flex: 1 }} href="/chat" key={item.id} asChild>
            <Pressable>
              <Card title={item.title} description={item.description} key={item.id} />
            </Pressable>
          </Link>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 4,
    backgroundColor: Colors.White,
    flex: 1
  }
});
