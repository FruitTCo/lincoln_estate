import { Dimensions, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utils/AuthContext';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Caption, Drawer, Paragraph, Title } from 'react-native-paper';
import { AntDesign, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import fontScale from '../utils/fontScale';

import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SkypeIndicator } from 'react-native-indicators';

const DrawerContent = (props) => {

  const { signOut } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState({})

  const [signOutStatus, setSignOutStatus] = useState(false)

  // const _currentUser = await AsyncStorage.getItem('currentUser');

  useEffect(() => {

    const getProfile = async () => {
      let userdata = await AsyncStorage.getItem('currentUser');

      userdata = JSON.parse(userdata)

      setCurrentUser({
        name: userdata.user.fullname,
        email: userdata.user.email,
        avatar: userdata.user.avatar,
      })
    }

    getProfile()

  }, [])

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: Dimensions.get("window").width * 0.1,
              alignItems: 'center'
            }}
          >
            <View style={{ marginTop: Dimensions.get("window").height * 0.03, alignItems: "center" }}>
              <Avatar.Image
                source={{
                  uri: currentUser.avatar !== "" || null ? currentUser.avatar : 'https://avatars.githubusercontent.com/u/45280368?v=4'
                }}
                size={150}
              />
              <View style={{ marginTop: Dimensions.get("window").height * 0.01, alignItems: "center" }}>

                {/* name and verified status */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Title style={[styles.title, { marginRight: 5 }]}>{currentUser.name}</Title>
                  <Octicons name="verified" size={fontScale(18)} color="black" />
                </View>

                {/* email */}
                <Caption style={styles.caption}>{currentUser.email}</Caption>

              </View>
            </View>
          </View>

          <Drawer.Section
            style={{
              marginTop: Dimensions.get("window").height * 0.02,
              borderTopColor: '#f4f4f4',
              borderTopWidth: 1
            }}
          >
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="ios-home-outline" size={size} color={props.state.index === 0 ? "lightblue" : color} />
              )}
              label="Home"
              labelStyle={[styles.label, props.state.index === 0 ? { color: "lightblue" } : null]}
              onPress={() => { props.navigation.navigate('Home') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={props.state.index === 1 ? "lightblue" : color} />
              )}
              label="Profile"
              labelStyle={[styles.label, props.state.index === 1 ? { color: "lightblue" } : null]}
              onPress={() => { props.navigation.navigate('Profile') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="bookmark-outline" size={size} color={props.state.index === 3 || props.state.index === 6 ? "lightblue" : color} />
              )}
              label="Complaints"
              labelStyle={[styles.label, props.state.index === 3 || props.state.index === 6 ? { color: "lightblue" } : null]}
              onPress={() => { props.navigation.navigate('Complaints') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="ios-settings-outline" size={size} color={props.state.index === 4 ? "lightblue" : color} />
              )}
              label="Settings"
              labelStyle={[styles.label, props.state.index === 4 ? { color: "lightblue" } : null]}
              onPress={() => { props.navigation.navigate('Settings') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="support-agent" size={size} color={color} />
              )}
              label="Support"
              labelStyle={styles.label}
              onPress={() => { Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description') }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <SafeAreaView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="ios-exit-outline" size={size} color="red" style={{ opacity: 0.6 }} />
            )}
            label="Sign Out"
            labelStyle={[styles.label, { color: "red", opacity: 0.6 }]}
            onPress={() => {
              setSignOutStatus(true)
              signOut()
            }}
          />
        </Drawer.Section>
      </SafeAreaView>

      {/* actity loader */}
      {signOutStatus === false ? null: <View
        pointerEvents='none'
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center"
          }
        ]}
      />}
    </View>
  )
}

export default DrawerContent

const styles = StyleSheet.create({
  title: {
    fontSize: fontScale(20),
    marginTop: 3,
    fontFamily: "Poppins_600SemiBold"
  },
  caption: {
    fontSize: fontScale(14),
    fontFamily: "Poppins_400Regular"
  },
  label: {
    fontSize: fontScale(14),
    fontFamily: "Poppins_500Medium"
  },
  bottomDrawerSection: {
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
});