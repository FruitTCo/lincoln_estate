import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Caption, Title } from 'react-native-paper'
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import fontScale from '../utils/fontScale';
import toLocalString from '../utils/toLocalString';

export default function RTCard({ date, amount, title }) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View
            style={{
                backgroundColor: "rgba(0,0,0,0.03)",
                borderRadius: Dimensions.get("window").height * 0.01,
                marginRight: Dimensions.get("window").height * 0.01,
                paddingVertical: Dimensions.get("window").height * 0.02,
                paddingHorizontal: Dimensions.get("window").width * 0.06,
            }}
        >

            <Title
                style={{
                    fontSize: fontScale(18),
                    fontFamily: "Poppins_500Medium",
                }}
            >{title}</Title>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                }}
            >

                <Caption
                    style={{
                        fontSize: fontScale(14),
                        fontFamily: "Poppins_400Regular",
                        marginRight: Dimensions.get("window").width * 0.04
                    }}
                >{date}</Caption>

                <Caption
                    style={{
                        fontSize: fontScale(16),
                        fontFamily: "Poppins_500Medium",
                    }}
                >₦ {toLocalString(amount)}</Caption>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({})