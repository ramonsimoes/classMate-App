import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../types'

interface Teacher {
  id: string
  name: string
  email: string
}

export default function TeachersList() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [teachers, setTeachers] = useState<Teacher[]>([])

  useEffect(() => {
    async function getTeachers() {
      try {
        const response = await fetch('http://localhost:5000/users')
        const data: Teacher[] = await response.json()
        setTeachers(data)
      } catch (error) {
        console.error('Erro ao buscar professores:', error)
      }
    }

    getTeachers()
  }, [])

  const handleEditTeacher = (teacher: Teacher) => {
    navigation.navigate('EditTeacher', { teacher })
  }

  const handleDeleteTeacher = (teacherId: string) => {
    console.log(`Professor com ID ${teacherId} excluído (mockado)`)
    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher.id !== teacherId)
    )
  }

  const renderItem = ({ item }: { item: Teacher }) => (
    <View style={styles.card}>
      <Text style={styles.teacherName}>{item.name}</Text>
      <Text style={styles.teacherEmail}>{item.email}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditTeacher(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTeacher(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Professores</Text>
      <FlatList
        data={teachers}
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2468ff',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  teacherName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  teacherEmail: {
    fontSize: 16,
    color: '#555',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
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
})
