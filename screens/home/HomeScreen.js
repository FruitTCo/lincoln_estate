import { Dimensions, Image, Linking, Pressable, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../utils/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, Caption, Title } from 'react-native-paper';
import { Entypo, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import fontScale from '../../utils/fontScale';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HomeTagBtn from '../../components/HomeTagBtn';
import RTCard from '../../components/RTCard';
import { CommonActions } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {

  const animation = useRef(null)

  const [error, setError] = useState(false)

  const { signOut } = useContext(AuthContext)

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
    <SafeAreaView style={{ flex: 1 }}>

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
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Pressable
            onPress={() => navigation.toggleDrawer()}
          >
            <Image
              source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAXUlEQVRoge3WMQrCABBE0a+1HlsPkKOKkHSxUCGtoEmE92BZ2GrYagoAAKCu1VjNO5+xurxDHxb7Vp2+94+fulfnquPrMFdDNW2V6ANTz6wAwK4ocytS5gAAgP/3AL+LYc/AKf6qAAAAAElFTkSuQmCC" }}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
        </View>

        {/* header title */}
        {/* <View style={{ flex: 1, alignItems: 'center' }}>
          <LogoTitle />
        </View> */}

        {/* header right */}
        <View style={{ flex: 1, alignItems: 'flex-end' }}>

          <Pressable
            onPress={()=>navigation.navigate("Notification")}
          >
            <Badge
              visible={true}
              size={10}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                borderWidth: 1,
                borderColor: "white",
                zIndex: 2
              }}
            />
            <MaterialCommunityIcons name="bell" size={24} color="black" />
          </Pressable>
        </View>

      </View>

      {/* body */}
      <View
        style={{
          flex: 1,
          paddingTop: Dimensions.get("window").height * 0.03,
          paddingHorizontal: Dimensions.get("window").height * 0.025,
        }}
      >

        {/* top container */}
        <View>

          {/* due balance */}
          <View>
            {/* label */}
            <Text
              style={{
                // marginTop: Dimensions.get("window").height * 0.01,
                fontSize: fontScale(15),
                color: "grey",
                fontFamily: "Poppins_400Regular"
              }}
            >Balance Due:</Text>

            {/* name */}
            <Text
              style={{
                fontSize: fontScale(50),
                fontFamily: "Poppins_600SemiBold",
                color: "lightblue"
              }}
            >₦ 20,000</Text>
          </View>

          {/* due date */}
          <View
            style={{
              marginVertical: Dimensions.get("window").height * 0.01,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            {/* label */}
            <Text
              style={{
                fontSize: fontScale(15),
                color: "grey",
                fontFamily: "Poppins_400Regular"
              }}
            >Due Date:</Text>

            {/* date */}
            <Text
              style={{
                fontSize: fontScale(18),
                color: "grey",
                fontFamily: "Poppins_400Regular"
              }}
            >23rd December 2022</Text>
          </View>

          {/* payment btn */}
          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
              alignItems: "center",
              paddingVertical: Dimensions.get("window").height * 0.02,
              marginTop: Dimensions.get("window").height * 0.02,
              borderRadius: "100%",
            }}
          >
            <Text
              style={{
                fontSize: fontScale(18),
                fontFamily: "Poppins_500Medium",
                color: "#fff"
              }}
            >Make a Payment</Text>
          </TouchableOpacity>

        </View>


        {/* bottom container */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: Dimensions.get("window").height * 0.03,
            flex: 1
          }}
        >


          {/* recent transaction */}
          <Text
            style={{
              fontSize: fontScale(18),
              fontFamily: "Poppins_500Medium",
              marginTop: Dimensions.get("window").height * 0.01,
            }}
          >Recent transaction</Text>

          {/* recent transaction container */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              alignItems: "center",
              // backgroundColor: "grey",
              paddingTop: Dimensions.get("window").height * 0.015,
              paddingBottom: Dimensions.get("window").height * 0.015,
            }}
          >

            <RTCard title="Service Charge" date="23 Nov, 2022" amount={1500} />
            <RTCard title="Service Charge" date="23 Nov, 2022" amount={1500} />
            <RTCard title="Service Charge" date="23 Nov, 2022" amount={1500} />
            <RTCard title="Service Charge" date="23 Nov, 2022" amount={1500} />

          </ScrollView>

          {/* other */}
          <Text
            style={{
              fontSize: fontScale(18),
              fontFamily: "Poppins_500Medium",
              marginTop: Dimensions.get("window").height * 0.01,
            }}
          >Other</Text>

          {/* card container */}
          <View
            style={{
              flex: 1,
            }}
          >

            {/* cards */}
            {/* history */}
            <HomeTagBtn 
              name="Payment History" iconName="history" 
              onPress={()=>navigation.navigate("PayHistory")}
            />

            {/* make complaint */}
            <HomeTagBtn
              name="Make Complaint" iconName="alert"
              onPress={()=>navigation.navigate("CreateComplaint")}
            />

            {/* report emergency */}
            <HomeTagBtn
              name="Report Emergency" iconName="megaphone"
              onPress={()=>navigation.navigate("ReportEmergency")}
            />

            {/* send feedback through mail */}
            <HomeTagBtn
              name="Send Feedback" iconName="paper-airplane"
              onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')}
            />

          </View>

        </ScrollView>

      </View>


    </SafeAreaView>
  )
}

export default HomeScreen