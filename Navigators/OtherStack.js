import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaymentHistory from '../screens/other/PaymentHistory';
import MakeComplaints from '../screens/other/MakeComplaints';
import NotificationScreen from '../screens/other/NotificationScreen';
import ReportEmergency from '../screens/other/ReportEmergency';

const Stack = createNativeStackNavigator();

export default function OtherStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        
      }}
    >
      <Stack.Screen name='PayHistory' component={PaymentHistory} />
      <Stack.Screen name='CreateComplaint' component={MakeComplaints} />
      <Stack.Screen name='ReportEmergency' component={ReportEmergency} />
      <Stack.Screen name='Notification' component={NotificationScreen} />
    </Stack.Navigator>
  )
}