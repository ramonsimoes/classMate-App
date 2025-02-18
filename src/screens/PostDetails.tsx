import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native'
import { format } from 'date-fns'
import { RootStackParamList } from '../types'
import { useAuth } from '../Context/AuthContext'

interface Post {
  id: string
  title: string
  author: string
  createdAt: string
  content: string
}

type RouteParams = {
  params: {
    postId: string
  }
}

export default function PostDetails() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute<RouteProp<RouteParams, 'params'>>()
  const { postId } = route.params || {}
  const [post, setPost] = useState<Post | null>(null)

  const { userEmail } = useAuth()
  const [userRole, setUserRole] = useState<'ADMIN' | 'MEMBER' | null>(null)

  useEffect(() => {
    if (postId) {
      getPostDetails()
    }
  }, [postId])

  async function getPostDetails() {
    try {
      const response = await fetch(`http://localhost:5000/posts/${postId}`)
      const data: Post = await response.json()
      setPost(data)
    } catch (error) {
      console.error('Erro ao buscar detalhes do post:', error)
    }
  }

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

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Por {post.author}</Text>
      <Text style={styles.date}>
        {format(new Date(post.createdAt), 'dd/MM/yyyy HH:mm')}
      </Text>
      <Text style={styles.description}>{post.content}</Text>
      {userRole === 'ADMIN' && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            navigation.navigate('EditPost', { post })
          }}
        >
          <Text style={styles.editButtonText}>Editar Postagem</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#2468ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
