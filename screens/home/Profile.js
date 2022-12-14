import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Caption, Title } from 'react-native-paper'
import { Octicons } from '@expo/vector-icons'
import fontScale from '../../utils/fontScale'
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
import ProfileInfoContainer from '../../components/ProfileInfoContainer'

const Profile = ({ navigation }) => {

  const [currentUser, setCurrentUser] = useState({})

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
    <SafeAreaView
      style={{ flex: 1 }}
    >

      {/* header */}
      <View
        style={{
          width: Dimensions.get("window").width,
          paddingVertical: Dimensions.get("window").height * 0.01,
          paddingHorizontal: Dimensions.get("window").height * 0.025,
          flexDirection: "row",
          alignItems: "center"
        }}
      >

        {/* header left */}
        <View style={{ alignItems: 'flex-start' }}>
          <Pressable
            onPress={() => navigation.toggleDrawer()}
          >
            <Image
              source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAXUlEQVRoge3WMQrCABBE0a+1HlsPkKOKkHSxUCGtoEmE92BZ2GrYagoAAKCu1VjNO5+xurxDHxb7Vp2+94+fulfnquPrMFdDNW2V6ANTz6wAwK4ocytS5gAAgP/3AL+LYc/AKf6qAAAAAElFTkSuQmCC" }}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
        </View>

      </View>

      <View
        style={{
          paddingVertical: Dimensions.get("window").width * 0.05,
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
          </View>
        </View>
      </View>

      <View style={{
        paddingHorizontal: Dimensions.get("window").height * 0.025,
      }}
      >

        <ProfileInfoContainer caption="Email" data={currentUser.email} />
        <ProfileInfoContainer caption="House Number" data={currentUser.email} />
        <ProfileInfoContainer caption="House Number" data={currentUser.email} />

      </View>

    </SafeAreaView>
  )
}

export default Profile

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
})