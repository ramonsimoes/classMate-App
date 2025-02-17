import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../types'
import { useAuth } from '../Context/AuthContext'

interface Post {
  id: string
  title: string
  author: string
  createdAt: string
  content: string
  smallDescription: string
  fullDescription: string
}

export default function App() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [posts, setPosts] = useState<Post[]>([])
  const [searchText, setSearchText] = useState('')
  const [sortCriteria, setSortCriteria] = useState<'date' | 'title' | 'author'>(
    'date'
  )

  const { userEmail } = useAuth()

  console.log(userEmail)

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts() {
    try {
      const response = await fetch('http://localhost:5000/posts/')
      const data: Post[] = await response.json()

      setPosts(data)
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    }
  }

  const [userRole, setUserRole] = useState<'ADMIN' | 'MEMBER' | null>(null)

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!userEmail) return

      try {
        const response = await fetch('http://localhost:5000/users')
        const users = await response.json()

        const loggedInUser = users.find((user: any) => user.email === userEmail)

        if (loggedInUser) {
          setUserRole(loggedInUser.role)
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      }
    }

    fetchUserRole()
  }, [userEmail])

  const handleEditPost = (post: Post) => {
    navigation.navigate('EditPost', { post })
  }

  const handleDeletePost = async (postId: string) => {
    try {
      await fetch(`http://localhost:5000/posts/${postId}`, {
        method: 'DELETE',
      })
      getPosts()
    } catch (error) {
      console.error('Erro ao excluir post:', error)
    }
  }

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostDetails', { postId: item.id })}
    >
      <View style={styles.item}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <View style={styles.boxItem}>
          <Text style={styles.postAuthor}>{item.author}</Text>
          <Text style={styles.postDate}>
            {format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')}
          </Text>
        </View>
        <Text style={styles.postDescription}>
          {item.content.substring(0, 100)}...
        </Text>
        {userRole === 'ADMIN' && (
          <View style={styles.adminButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditPost(item)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePost(item.id)}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  const filteredPosts = posts.filter((post) => {
    const searchTextLower = searchText.toLowerCase()
    return (
      post.title.toLowerCase().includes(searchTextLower) ||
      post.author.toLowerCase().includes(searchTextLower) ||
      post.content.toLowerCase().includes(searchTextLower) ||
      format(new Date(post.createdAt), 'dd/MM/yyyy HH:mm').includes(
        searchTextLower
      )
    )
  })

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortCriteria === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortCriteria === 'title') {
      return a.title.localeCompare(b.title)
    } else if (sortCriteria === 'author') {
      return a.author.localeCompare(b.author)
    }
    return 0
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>ClassMate</Text>
        <Image
          style={styles.logo}
          source={require('../../assets/classmate_icon.png')}
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {userRole === 'ADMIN' && (
          <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => {
              navigation.navigate('CreatePost')
            }}
          >
            <Text style={styles.createPostButtonText}>Criar Postagem</Text>
          </TouchableOpacity>
        )}
      </View>

      {userRole === 'ADMIN' && (
        <>
          <TouchableOpacity
            style={styles.createUserButton}
            onPress={() => {
              navigation.navigate('SignUp')
            }}
          >
            <Text style={styles.createUserButtonText}>Criar Usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createTeachersListButton}
            onPress={() => {
              navigation.navigate('TeachersList')
            }}
          >
            <Text style={styles.createTeachersListButtonText}>Professores</Text>
          </TouchableOpacity>
        </>
      )}

      <SegmentedControl
        values={['Data', 'Título', 'Autor']}
        selectedIndex={
          sortCriteria === 'date' ? 0 : sortCriteria === 'title' ? 1 : 2
        }
        onChange={(event) => {
          const index = event.nativeEvent.selectedSegmentIndex
          setSortCriteria(
            index === 0 ? 'date' : index === 1 ? 'title' : 'author'
          )
        }}
        style={styles.segmentedControl}
      />

      <FlatList
        data={sortedPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  createPostButton: {
    backgroundColor: '#2468ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  createPostButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  listContentContainer: {
    paddingBottom: 20,
  },
  createUserButton: {
    backgroundColor: '#2468ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  createUserButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  adminButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  createTeachersListButton: {
    backgroundColor: '#2468ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  createTeachersListButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
