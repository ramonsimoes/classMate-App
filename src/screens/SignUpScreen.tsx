import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types'

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'MEMBER' | 'ADMIN'>('MEMBER')

  const handleSignUp = async () => {
    const user = {
      name,
      email,
      password,
      role,
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!')
        navigation.navigate('App')
      } else {
        alert('Erro ao cadastrar usuário.')
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      alert('Erro ao cadastrar usuário.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label=" Aluno" value="MEMBER" />
          <Picker.Item label=" Professor" value="ADMIN" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  button: {
    backgroundColor: '#2468ff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
