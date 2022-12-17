import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useMemo, useReducer, useState } from 'react';
import AnimatedSplash from 'react-native-animated-splash-screen';
import ChatsScreen from './screens/home/ChatsScreen';
import ComplaintsScreen from './screens/home/ComplaintsScreen';
import HomeScreen from './screens/home/HomeScreen';
import Profile from './screens/home/Profile';
import SettingsScreen from './screens/home/SettingsScreen';
import RootStackScreen from './Navigators/RootStackScreen';
import OtherStack from './Navigators/OtherStack';
import { ActivityIndicator, Dimensions, Image, Pressable, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './utils/AuthContext';
import DrawerContent from './content/DrawerContent';
import client from './utils/client';
import PaymentHistory from './screens/other/PaymentHistory';
import MakeComplaints from './screens/other/MakeComplaints';
import NotificationScreen from './screens/other/NotificationScreen';
import ReportEmergency from './screens/other/ReportEmergency';
import { DotIndicator } from 'react-native-indicators';


const Drawer = createDrawerNavigator();

export default function App() {

  const initialLoginState = {
    isLoading: true,
    currentUser: null,
  };


  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          currentUser: action.currentUser,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          currentUser: action.currentUser,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          currentUser: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          currentUser: action.currentUser,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);

      try {
        await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser));
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', currentUser: foundUser });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      let user;

      try {
        user = await AsyncStorage.getItem('currentUser');
        user = JSON.parse(user)

        let res = await client.post('/sign-out', {}, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            authorization: `JWT ${user.token}`,
          },
        });

        if (res.data.success === true) {
          await AsyncStorage.removeItem('currentUser');
        } else {
          console.error(res.data);
        }

      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let _currentUser;
      _currentUser = null;
      try {
        _currentUser = await AsyncStorage.getItem('currentUser');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', currentUser: JSON.parse(_currentUser) });
    }, 1000);
  }, []);


  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DotIndicator color="blue"/>
      </View>
    );
  }


  return (
    // <AnimatedSplash
    //   translucent={true}
    //   isLoaded={true}
    //   logoImage={{ uri: "https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg" }}
    //   backgroundColor={"#fff"}
    //   logoHeight={150}
    //   logoWidth={150}
    // >
    <AuthContext.Provider
      value={authContext}
    >
      <NavigationContainer>
        {
          loginState.currentUser !== null ? (
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
              }}
              drawerContent={props => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Profile" component={Profile} />
              <Drawer.Screen name="Chat" component={ChatsScreen} />
              <Drawer.Screen name="Complaints" component={ComplaintsScreen} />
              <Drawer.Screen name="Settings" component={SettingsScreen} />
              <Drawer.Screen name='PayHistory' component={PaymentHistory} />
              <Drawer.Screen name='CreateComplaint' component={MakeComplaints} />
              <Drawer.Screen name='ReportEmergency' component={ReportEmergency} options={{ swipeEnabled: false }} />
              <Drawer.Screen name='Notification' component={NotificationScreen} />
            </Drawer.Navigator>
          )
            :
            <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
    // </AnimatedSplash>
  );
}
