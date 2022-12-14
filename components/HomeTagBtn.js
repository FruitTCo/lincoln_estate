import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, Octicons } from '@expo/vector-icons'
import fontScale from '../utils/fontScale'
import {
    useFonts,
    Poppins_500Medium
} from '@expo-google-fonts/poppins';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeTagBtn = ({ onPress, name, iconName }) => {

    let [fontsLoaded] = useFonts({
        Poppins_500Medium
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.card}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Octicons name={iconName} size={fontScale(20)} color="grey" />
                <Text
                    style={{
                        fontSize: fontScale(16),
                        fontFamily: "Poppins_500Medium",
                        marginVertical: Dimensions.get("window").height * 0.01,
                        marginLeft: fontScale(15),
                        color: "grey"
                    }}
                >{name}</Text>
            </View>

            <AntDesign name="right" size={fontScale(16)} color="rgba(0,0,0,0.7)" />
        </TouchableOpacity>
    )
}

export default HomeTagBtn

const styles = StyleSheet.create({
    card: {
        marginTop: Dimensions.get("window").height * 0.01,
        paddingVertical: Dimensions.get("window").height * 0.01,
        paddingHorizontal: Dimensions.get("window").width * 0.05,
        backgroundColor: "rgba(0,0,0,0.03)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10
    }
})