import { Button, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native"
import AppLoading from 'expo-app-loading';
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
import { MaterialIcons } from '@expo/vector-icons';


const image = { uri: "https://reactjs.org/logo-og.png" };

const Onboarding1 = ({ navigation }) => {

    const animation = useRef(null)

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
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                {/* <Image
                    style={{
                        width: Dimensions.get("screen").width * 0.8,
                        height: Dimensions.get("screen").height * 0.5,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                    }}
                /> */}
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: Dimensions.get("screen").width,
                        height: Dimensions.get("screen").width,
                        // backgroundColor: '#000',
                    }}
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require('../../assets/animations/ob1.json')}
                />
            </View>
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 10 }]}>

                <View style={[styles.container, { justifyContent: 'center' }]}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.text, styles.blueText]}>Search </Text>
                        <Text style={styles.text}>people </Text>
                        <Text style={styles.text}>that </Text>
                        <Text style={styles.text}>you've </Text>
                        <Text style={styles.text}>lived </Text>
                        <Text style={styles.text}>with </Text>
                        <Text style={styles.text}>in </Text>
                        <Text style={styles.text}>the </Text>
                        <Text style={[styles.text, styles.blueText]}> past</Text>
                        <Text style={styles.text}> & </Text>
                        <Text style={styles.text}>at </Text>
                        <Text style={styles.text}>the </Text>
                        <Text style={[styles.text, styles.blueText]}> present</Text>
                        <Text style={styles.text}> moment</Text>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={styles.dotContainer}>
                        <View style={styles.dot}></View>
                        <View style={[styles.dot, styles.activeDot]}></View>
                        <View style={styles.dot}></View>
                    </View>

                    <Pressable
                        style={styles.nextBtn}
                        onPress={() => navigation.navigate("Onboarding2")}
                    >
                        <MaterialIcons name="navigate-next" size={24} color="white" />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Onboarding1

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContainer: {
        alignItems: 'center',
        width: '100%',
        paddingTop: Dimensions.get("screen").height * 0.05
    },
    blueText: {
        color: 'blue',
        fontFamily: 'Poppins_600SemiBold',
    },
    text: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
    },
    dotContainer: {
        flexDirection: 'row',
    },
    dot: {
        backgroundColor: 'rgba(0,0,225, 0.2)',
        width: 10,
        height: 10,
        marginEnd: 6,
        borderRadius: '100%'
    },
    activeDot: {
        width: 20,
        backgroundColor: 'blue'
    },
    nextBtn: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%'
    }
})