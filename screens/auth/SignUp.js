import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native"
import fontScale from '../../utils/fontScale'
import Spacer from '../../utils/Spacer'
import { Feather } from '@expo/vector-icons'
import { ValidateEmail } from '../../utils/validation'
import { ScrollView } from 'react-native-gesture-handler'
import CustomBorderInput from '../../components/CustomBorderInput'

const SignUp = ({ navigation }) => {

  const animation = useRef(null)
  const fullNameRef = useRef(null)
  const emailRef = useRef(null)
  const telRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const [selected, setSelected] = useState(null)

  const [paswordShown, setPaswordShown] = useState(true)

  const [fullname, setFullname] = useState('');

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const _showAlert = ({ text }) => {
    return Alert.alert(
      "",
      text,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
      ]
    );
  }

  const _checkForm = () => {
    // check if form is empty
    if (!fullname || !email || !password || !phone || !confirmPassword) {
      return _showAlert({ text: "All fields are required." }) 
    }
    // check if fullname is valid
    if (!fullname.trim() || fullname < 8) {
      return _showAlert({ text: "Your fullname is required." })
    }
    // check if email is valid
    if (!email.trim() || ValidateEmail(email) === false) {
      return _showAlert({ text: "Valid email is required." })
    }
    // check if password is correct lenght
    if (!password.trim() || password < 8 || password > 26) {
      return _showAlert({ text: "Password must be 8 to 26 characters long." })
    }
    // check if password and checkPassword are thesame
    if (password !== confirmPassword) {
      return _showAlert({ text: "Confirm password, password not same" })
    }
    _signUp()
  }

  // navigation.navigate("AuthStack", { screen: "SignIn" })

  const _signUp = async () => {

  }

  return (
    <Pressable
      onPress={() => {
        _resetSelectedInput()
        Keyboard.dismiss()
      }}
      style={{ flex: 1 }}
    >

      <SafeAreaView
        style={{ flex: 1, justifyContent: "flex-end" }}
      >

        {/* top container aka lottie */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: Dimensions.get("window").width * 0.1,
            paddingBottom: Dimensions.get("window").width * 0.08,
            paddingHorizontal: Dimensions.get("window").height * 0.03,
            position: 'relative'
          }}
        >

          {/* <LottieView
            autoPlay
            ref={animation}
            style={{
              width: Dimensions.get("window").width * 0.6,
              height: Dimensions.get("window").width * 0.6,
              position: 'absolute',
              top: 0,
              right: 0
              // backgroundColor: '#000',
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={{ uri: 'https://assets10.lottiefiles.com/packages/lf20_lupehzac.json' }}
          /> */}

          <Text style={styles.header}>Let's Get You Started.</Text>

        </View>

        {/* input container */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? "height" : "padding"}
          style={{
            // flex: 1
            marginBottom: Dimensions.get("window").width * 0.05
          }}>
          <ScrollView
            style={{
              // flex: 1,
              paddingHorizontal: Dimensions.get("window").height * 0.03,
            }}
          >

            <CustomBorderInput
              inputRef={fullNameRef}
              name="full name"
              // expo feather icon name only
              iconName="user"
              placeholder="e.g. John Doe"
              autoComplete="name"
              onChangeText={setFullname}
              value={fullname}
              returnKeyType="next"
              onSubmitEditing={()=>emailRef.current.focus()}
            />

            <Spacer />

            <CustomBorderInput
              inputRef={emailRef}
              name="email"
              // expo feather icon name only
              iconName="mail"
              placeholder="e.g. example@mymail.com"
              autoComplete="email"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={()=>telRef.current.focus()}
            />

            <Spacer />

            <CustomBorderInput
              inputRef={telRef}
              name="phone"
              // expo feather icon name only
              iconName="mail"
              placeholder="e.g. +1 233 022 829"
              autoComplete="phone"
              onChangeText={setPhone}
              value={phone}
              keyboardType={'phone-pad'}
              returnKeyType="next"
              onSubmitEditing={()=>passwordRef.current.focus()}
            />

            <Spacer />

            <CustomBorderInput
              inputRef={passwordRef}
              name="password"
              // expo feather icon name only
              iconName="lock"
              placeholder="********"
              autoComplete="password-new"
              secureTextEntry={paswordShown}
              onChangeText={setPassword}
              value={password}
              maxLength={20}
              passwordRules="minlength: 8; maxlength: 20;"
              returnKeyType="next"
              onSubmitEditing={()=>confirmPasswordRef.current.focus()}
            />

            <Spacer />

            <CustomBorderInput
              inputRef={confirmPasswordRef}
              name="confirm password"
              // expo feather icon name only
              iconName="lock"
              placeholder="********"
              autoComplete="password-new"
              secureTextEntry={paswordShown}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              maxLength={20}
              passwordRules="minlength: 8; maxlength: 20;"
              onSubmitEditing={()=>Keyboard.dismiss()}
            />

            {/* <Spacer /> */}

            <Spacer />

            {/* login btn */}
            <Pressable
              onPress={() => {
                _checkForm();
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'blue',
                paddingVertical: Dimensions.get("window").height * 0.02,
                borderRadius: Dimensions.get("window").height * 0.01,
                marginTop: Dimensions.get("window").height * 0.01
              }}
            >
              <Text
                style={{
                  fontSize: fontScale(18),
                  fontFamily: 'Poppins_400Regular',
                  color: 'white'
                }}
              >Sign up</Text>
            </Pressable>

          </ScrollView>

        </KeyboardAvoidingView>

        {/* already have an account */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
        >
          <Text
            style={{
              fontSize: fontScale(14),
              fontFamily: 'Poppins_400Regular'
            }}
          >Already have an account? </Text>

          <Pressable
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text
              style={{
                fontSize: fontScale(16),
                color: 'blue',
                fontFamily: 'Poppins_500Medium'
              }}
            >Sign in</Text>
          </Pressable>
        </View>

      </SafeAreaView>

    </Pressable>
  )
}

export default SignUp

const styles = StyleSheet.create({
  header: {
    color: 'blue',
    fontSize: fontScale(22),
    fontFamily: 'Poppins_600SemiBold',
  },
})