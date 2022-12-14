import { View, Text, Dimensions, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Caption, Title } from 'react-native-paper'
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
import fontScale from '../utils/fontScale';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileInfoContainer({ data, caption }) {
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
        <View
            style={{
                backgroundColor: 'rgba(0,0,0,0.05)',
                paddingHorizontal: Dimensions.get("window").width * 0.05,
                paddingVertical: Dimensions.get("window").height * 0.01,
                borderRadius: Dimensions.get("window").height * 0.01,
                marginBottom: Dimensions.get("window").height * 0.01,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >

            <View>
                <Caption style={styles.caption}>Your {caption}</Caption>
                <Title style={styles.title}>{data}</Title>
            </View>

            <Pressable>
                <MaterialIcons name="navigate-next" size={fontScale(30)} color="rgba(0,0,0,0.5)" />
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: fontScale(18),
        lineHeight: fontScale(20),
        fontFamily: "Poppins_500Medium"
    },
    caption: {
        fontSize: fontScale(12),
        fontFamily: "Poppins_400Regular"
    },
})