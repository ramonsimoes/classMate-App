import { SafeAreaView, StyleSheet, Text, Image, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import React, { useEffect, useState } from 'react'; 
import { supabase } from './lib/supabase';
import { format } from 'date-fns';   

interface Post {
  id: number;
  title: string;
  author: string;
  created_at: string;
  small_description: string;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date'); 

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.error("Error fetching posts:", error);
        return;
      }
      if (data) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <View style={styles.boxItem}>
          <Text style={styles.postAuthor}>{item.author}</Text>
          <Text style={styles.postDate}>{format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}</Text>
        </View>
        <Text style={styles.postDescription}>{item.small_description}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredPosts = posts.filter(post => {
    const searchTextLower = searchText.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchTextLower) ||
      post.author.toLowerCase().includes(searchTextLower) ||
      post.small_description.toLowerCase().includes(searchTextLower) ||
      format(new Date(post.created_at), 'dd/MM/yyyy HH:mm').includes(searchTextLower)
    );
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortCriteria === 'date') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortCriteria === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === 'author') {
      return a.author.localeCompare(b.author);
    }
    return 0;
  });

  return (  
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>ClassMate</Text>
        <Image style={styles.logo} source={require('./assets/classmate_icon.png')} />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <SegmentedControl
        values={['Data', 'Título', 'Professor']}
        selectedIndex={sortCriteria === 'date' ? 0 : sortCriteria === 'title' ? 1 : 2}
        onChange={(event) => {
          const index = event.nativeEvent.selectedSegmentIndex;
          setSortCriteria(index === 0 ? 'date' : index === 1 ? 'title' : 'author');
        }}
        style={styles.segmentedControl}
      />

      <FlatList
        data={sortedPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  box: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 10, 
    backgroundColor: '#2468ff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',   
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  segmentedControl: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    padding: 20,  
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10, 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  boxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    marginBottom: 20,
  },
  postAuthor: {
    fontSize: 15, 
  },
  postDate: {
    fontSize: 15, 
  },
  postDescription: {
    fontSize: 15,
  },
});