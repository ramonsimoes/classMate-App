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

interface Teacher {
  id: string
  name: string
  email: string
}

type RouteParams = {
  params: {
    teacher: Teacher
  }
}

export default function EditTeacher() {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RouteParams, 'params'>>()
  const { teacher } = route.params || {}

  const [name, setName] = useState(teacher?.name || '')
  const [email, setEmail] = useState(teacher?.email || '')

  const handleUpdateTeacher = async () => {
    if (!name || !email) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    const updatedTeacher = {
      name,
      email,
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users/${teacher.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTeacher),
        }
      )

      if (response.ok) {
        Alert.alert('Sucesso', 'Professor atualizado com sucesso!')
        navigation.goBack()
      } else {
        Alert.alert('Erro', 'Falha ao atualizar professor')
      }
    } catch (error) {
      console.error('Erro ao atualizar professor:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o professor')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o e-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateTeacher}>
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
