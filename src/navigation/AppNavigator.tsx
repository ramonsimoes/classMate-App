import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { RootStackParamList } from '../types'
import App from '../screens/App'
import LoginScreen from '../screens/LoginScreen'
import PostDetails from '../screens/PostDetails'
import CreatePost from '../screens/CreatePost'
import EditPost from '../screens/EditPost'
import SignUpScreen from '../screens/SignUpScreen'
import { AuthProvider } from '../Context/AuthContext'
import TeachersList from '../screens/TeachersList'
import EditTeacher from '../screens/EditTeacher'

const Stack = createStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TeachersList"
            component={TeachersList}
            options={{ title: 'Professores' }}
          />
          <Stack.Screen
            name="EditTeacher"
            component={EditTeacher}
            options={{ title: 'Editar Professor' }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Cadastro' }}
          />
          <Stack.Screen
            name="App"
            component={App}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="PostDetails"
            component={PostDetails}
            options={{ title: 'Detalhes da postagem' }}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{ title: 'Criar Postagem' }}
          />
          <Stack.Screen
            name="EditPost"
            component={EditPost}
            options={{ title: 'Editar Postagem' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}
