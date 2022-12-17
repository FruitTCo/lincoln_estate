import { Alert, Dimensions, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomBorderInput from '../../components/CustomBorderInput'
import fontScale from '../../utils/fontScale'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { Caption, Title } from 'react-native-paper'
import { SkypeIndicator } from 'react-native-indicators'

export default function MakeComplaints({ navigation }) {

  const textInputRef = useRef()

  const [formValid, setFormValid] = useState(false)

  const [verifying, setVerifying] = useState(false)

  const [text, setText] = useState()

  const [textCount, setTextCount] = useState(0)
  // create an alert
  const _showAlert = ({ text, onPress }) => {
    return Alert.alert(
      "",
      text,
      [
        {
          text: "Cancel",
          onPress: onPress,
          style: "cancel"
        },
      ]
    );
  }

  const validateTextInput = () => {
    setVerifying(true)
    if (!text.trim() || text.lenght < 150) {
      setVerifying(false)
      return _showAlert({ text: "At least 150 words needed to make a complaint!" })
    }
  }

  const _submitComplaint = async () => {
    await validateTextInput();
  }

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
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
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >

          {/* header left */}
          <View style={{ alignItems: 'flex-start', }}>
            <Pressable
              onPress={() => navigation.goBack()}
            >
              <Image
                source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAAAS0lEQVRIie3SsQmAQBREwSlMOLQny9QezLQLQ0Ojf6ewr4FhYUlPDVslMOHEHOANWAIMBa5fA3BgrQTotKQ7VPquQIHGQQ17NfKNbuCzHJ2P10S/AAAAAElFTkSuQmCC" }}
                style={{
                  width: fontScale(26),
                  height: fontScale(26),
                }}
              />
            </Pressable>
          </View>

          {/* heading */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
              style={{
                // marginBottom: Dimensions.get("window").height * 0.02,
                fontSize: fontScale(18),
                color: "black",
                fontFamily: "Poppins_400Regular",
                textAlign: "center"
              }}
            >Make a complaint</Text>
          </View>

          <View
            style={{
              width: fontScale(26),
              height: fontScale(26),
            }}
          ></View>

        </View>

        {/* body */}
        <View
          style={{
            flex: 1,
            paddingTop: Dimensions.get("window").height * 0.025,
            paddingHorizontal: Dimensions.get("window").height * 0.025,
            // backgroundColor: "lightblue"
          }}
        >

          <View
            style={{
              paddingBottom: Dimensions.get("window").height * 0.025
            }}
          >
            <Title
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: fontScale(24)
              }}
            >Outline the details of your complaint.</Title>
            <Caption
              style={{
                fontFamily: "Poppins_300Light",
                fontSize: fontScale(16)
              }}
            >Give an accurate description of your complaint to aid us in solving it.</Caption>
          </View>

          {/* text input */}
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,225,0.1)",
              paddingVertical: Dimensions.get("window").height * 0.02,
              paddingHorizontal: Dimensions.get("window").height * 0.02,
              borderRadius: Dimensions.get("window").height * 0.02,
              position: "relative"
            }}
            onPress={() => textInputRef.current.focus()}
          >
            <TextInput
              ref={textInputRef}
              placeholder='Lets write it out...'
              multiline={true}
              scrollEnabled={true}
              autoCorrect={true}
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: fontScale(16),
                color: "grey"
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                paddingVertical: Dimensions.get("window").height * 0.015,
                paddingHorizontal: Dimensions.get("window").height * 0.02,
              }}
            >
              <Text
                style={{
                  color: "rgba(0,0,0,0.2)",
                  fontSize: fontScale(16),
                  fontFamily: "Poppins_500Medium",
                }}
              >{textCount}/3000</Text>
            </View>

          </Pressable>

          {/* submit button */}
          <TouchableOpacity
            style={{
              backgroundColor: !formValid ? "rgba(0,0,225,0.1)" : "blue",
              alignItems: "center",
              paddingVertical: Dimensions.get("window").height * 0.02,
              marginTop: Dimensions.get("window").height * 0.025,
              borderRadius: "100%",
            }}

          >
            <Text
              style={{
                fontSize: fontScale(20),
                fontFamily: "Poppins_500Medium",
                color: "#fff"
              }}
            >Submit</Text>
          </TouchableOpacity>

        </View>

        {/* actity loader */}
        {verifying === false ? null :
          <View
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                backgroundColor: "rgba(0,0,0,0.3)",
                justifyContent: "center",
                alignItems: "center"
              }
            ]}
          >
            <SkypeIndicator color="blue" />
          </View>
        }

      </SafeAreaView>
    </Pressable>
  )
}

const styles = StyleSheet.create({})