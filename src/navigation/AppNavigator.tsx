import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import App from '../screens/App';
import PostDetails from '../screens/PostDetails';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Screen name="App" component={App} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
}
