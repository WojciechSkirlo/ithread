import { View, FlatList } from 'react-native';
import { Link } from 'expo-router';
import Card from '@components/Card';

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
  }
];

export default function Home() {
  return (
    <View style={{ padding: 16, paddingTop: 4, backgroundColor: '#fff', flex: 1 }}>
      <Link href="/conversation">
        <Card title="asdasd" description="asd" />
      </Link>

      <FlatList
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        data={DATA}
        numColumns={2}
        renderItem={({ item }) => <Card title={item.title} description={item.description} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
