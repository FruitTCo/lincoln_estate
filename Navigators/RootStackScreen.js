import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../screens/Onboarding/Onboarding';
import Onboarding1 from '../screens/Onboarding/Onboarding1';
import Onboarding2 from '../screens/Onboarding/Onboarding2';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';

const Stack = createNativeStackNavigator();

const RootStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen 
          component={Onboarding} 
          name="Onboarding" 
          options={{ animation: 'fade' }} 
        />
        <Stack.Screen 
          component={Onboarding1} 
          name="Onboarding1" 
          options={{ animation: 'fade' }} 
        />
        <Stack.Screen 
          component={Onboarding2} 
          name="Onboarding2" 
          options={{ animation: 'fade' }} 
        />
        <Stack.Screen 
            component={SignIn} 
            name="SignIn" 
        />
        <Stack.Screen 
            component={SignUp} 
            name="SignUp" 
        />
    </Stack.Navigator>
  )
}

export default RootStackScreen