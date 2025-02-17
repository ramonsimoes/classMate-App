import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'

interface Post {
  id: string
  title: string
  author: string
  fullDescription: string
}

type RouteParams = {
  params: {
    post: Post
  }
}

export default function EditPost() {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RouteParams, 'params'>>()
  const { post } = route.params || {}

  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.fullDescription || '')
  const [author, setAuthor] = useState(post?.author || '')

  const handleUpdatePost = async () => {
    if (!title || !content || !author) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    const updatedPost = {
      title,
      content,
      author,
    }

    try {
      const response = await fetch(`http://localhost:5000/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      })

      if (response.ok) {
        Alert.alert('Sucesso', 'Postagem atualizada com sucesso!')
        navigation.goBack()
      } else {
        Alert.alert('Erro', 'Falha ao atualizar postagem')
      }
    } catch (error) {
      console.error('Erro ao atualizar postagem:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar a postagem')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Digite o conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o autor"
        value={author}
        onChangeText={setAuthor}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdatePost}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2468ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
