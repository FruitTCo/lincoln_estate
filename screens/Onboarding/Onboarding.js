import { Button, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native"
import * as Animatable from 'react-native-animatable';
import {
    useFonts,

    Poppins_400Regular,
    Poppins_600SemiBold
} from '@expo-google-fonts/poppins';
import { MaterialIcons } from '@expo/vector-icons';


const image = { uri: "https://reactjs.org/logo-og.png" };

const Onboarding = ({ navigation }) => {

    const animation = useRef(null)

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animatable.View 
                style={styles.topContainer}
                animation="fadeInLeft" 
                duration={1000}
            >
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
                    source={require('../../assets/animations/ob.json')}
                />
            </Animatable.View>

            <View style={[styles.container, { alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 10 }]}>

                <Animatable.View 
                    style={[styles.container, { justifyContent: 'center' }]}
                    animation="fadeInUp" 
                    duration={1000}
                >
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>Maintain </Text>
                        <Text style={styles.text}>good </Text>
                        <Text style={styles.text}>ratings </Text>
                        <Text style={styles.text}>to </Text>
                        <Text style={styles.text}>get </Text>
                        <Text style={styles.text}>best </Text>
                        <Text style={[styles.text, styles.blueText]}> landlord</Text>
                        <Text style={styles.text}>,</Text>
                        <Text style={[styles.text, styles.blueText]}> tenants</Text>
                        <Text style={styles.text}> &</Text>
                        <Text style={[styles.text, styles.blueText]}> subtenants</Text>
                    </View>
                </Animatable.View>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={styles.dotContainer}>
                        <View style={[styles.dot, styles.activeDot]}></View>
                        <View style={styles.dot}></View>
                        <View style={styles.dot}></View>
                    </View>

                    <Pressable
                        style={styles.nextBtn}
                        onPress={() => navigation.navigate("Onboarding1")}
                    >
                        <MaterialIcons name="navigate-next" size={24} color="white" />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Onboarding

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
        flexDirection: 'row'
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