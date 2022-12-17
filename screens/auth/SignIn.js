import { ActivityIndicator, Alert, Animated, Dimensions, Image, Keyboard, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native"
import fontScale from '../../utils/fontScale'
import Spacer from '../../utils/Spacer'
import { Feather } from '@expo/vector-icons'
import { ValidateEmail } from '../../utils/validation'
import client from "../../utils/client"
import CustomBorderInput from '../../components/CustomBorderInput'
import { AuthContext } from '../../utils/AuthContext'
import Users from '../../models/Users'
import { SkypeIndicator } from 'react-native-indicators'

const SignIn = ({ navigation }) => {

    const { signIn } = useContext(AuthContext);

    const emailRef = useRef()

    const passwordRef = useRef()

    const animation = useRef();

    const [verifying, setVerifying] = useState(false)

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [paswordShown, setPaswordShown] = useState(true)

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
        setVerifying(true)
        if (!email || !password) {
            setVerifying(false)
            return _showAlert({ text: "All fields are required." })
        }
        // check if email is valid
        if (!email.trim() || ValidateEmail(email) === false) {
            setVerifying(false)
            emailRef.current.focus()
            return _showAlert({ text: "Valid email is required." })
        }
        // check if password is correct lenght
        if (!password.trim() || password < 8) {
            setVerifying(false)
            passwordRef.current.focus()
            return _showAlert({ text: "Password must be 8 to 20 characters long." })
        }
        setVerifying(true)
        _signIn()
    }

    const _signIn = async () => {

        try {

            let res = await client.post(
                '/sign-in',
                {
                    email: email.toLowerCase(),
                    password: password
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (res.data.success === false) {
                _showAlert({ text: res.data.message })
                console.log(res.data);
            } else {

                const foundUser = {
                    token: res.data.token,
                    user: res.data.user
                }

                // const foundUser = Users.filter( item => {
                //     return "user1" == item.username && "password" == item.password;
                // } );

                setTimeout(() => {
                    signIn(foundUser);
                }, 1000);
            }

            setVerifying(false)

        } catch (error) {
            setVerifying(false)
            _showAlert("An error occured")
            console.error(error);
        }


    }

    return (
        <Pressable
            onPress={() => {
                Keyboard.dismiss()
            }}
            style={{ flex: 1, backgroundColor: '#ffffff' }}
        >

            <SafeAreaView
                style={{ flex: 1, justifyContent: "flex-end" }}
            >

                {/* top container aka lottie */}
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: Dimensions.get("window").width * 0.1,
                        paddingHorizontal: Dimensions.get("window").height * 0.03
                    }}
                >

                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                            width: Dimensions.get("window").width * 0.6,
                            height: Dimensions.get("window").width * 0.6,
                            // backgroundColor: '#000',
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={{ uri: 'https://assets7.lottiefiles.com/packages/lf20_8xgkc3be.json' }}
                    />

                    <Text style={styles.header}>Let's Get You Signed in.</Text>

                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? "height" : "padding"}
                    style={{
                        // flex: 1
                        marginBottom: Dimensions.get("window").width * 0.05
                    }}
                >

                    {/* input container */}
                    <ScrollView
                        style={{
                            // flex: 1,
                            paddingHorizontal: Dimensions.get("window").height * 0.03,
                        }}
                    >

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
                            onSubmitEditing={() => passwordRef.current.focus()}
                        />

                        <Spacer />

                        <CustomBorderInput
                            inputRef={passwordRef}
                            name="password"
                            // expo feather icon name only
                            iconName="lock"
                            placeholder="********"
                            autoComplete="password"
                            secureTextEntry={paswordShown}
                            onChangeText={setPassword}
                            value={password}
                            maxLength={20}
                            passwordRules="minlength: 8; maxlength: 20;"
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />

                        <Spacer />

                        {/* remember me */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >

                            <Pressable
                                onPress={() => {
                                    setVerifying(!verifying)
                                    console.log(verifying);
                                }}
                                style={[{
                                    padding: 4,
                                    borderRadius: '100%',
                                    marginRight: 10
                                }, true ? { backgroundColor: 'rgba(0,0,0,0.3)' } : { backgroundColor: 'blue' }]}
                            >
                                <Feather name="check" size={14} color="white" />
                            </Pressable>

                            <Text
                                style={[{
                                    fontSize: fontScale(14),
                                    fontFamily: 'Poppins_500Medium'
                                }, true ? { color: "rgba(0,0,0,0.3)" } : { color: "black" }]}
                            >Remember me</Text>

                        </View>

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
                                marginTop: Dimensions.get("window").height * 0.005
                            }}
                        >
                            {verifying === false ? <Text
                                style={{
                                    fontSize: fontScale(18),
                                    fontFamily: 'Poppins_400Regular',
                                    color: 'white'
                                }}
                            >Sign in</Text> :
                                <ActivityIndicator size="small" color="white" />}
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
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text
                            style={{
                                fontSize: fontScale(16),
                                color: 'blue',
                                fontFamily: 'Poppins_500Medium'
                            }}
                        >Sign up</Text>
                    </Pressable>
                </View>

            </SafeAreaView>

            {/* actity loader */}
            {verifying === false ? null : <View
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
            >
                <SkypeIndicator color="blue" />
            </View>}

        </Pressable>
    )
}

export default SignIn

const styles = StyleSheet.create({
    header: {
        color: 'blue',
        fontSize: fontScale(22),
        fontFamily: 'Poppins_600SemiBold',
    },
})