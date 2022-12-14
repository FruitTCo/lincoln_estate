import { View, Text, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import fontScale from '../utils/fontScale';
import capitalize from '../utils/capitalize';

const CustomBorderInput = ({
    inputRef,
    name,
    iconName,
    placeholder,
    secureTextEntry,
    autoComplete,
    onChangeText,
    value,
    keyboardType,
    passwordRules,
    onSubmitEditing,
    returnKeyType,
    maxLength
}) => {

    return (
        <View
            style={{
                width: '100%'
            }}
        >

            <Text
                style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14 * Dimensions.get("screen").fontScale,
                }}
            >{capitalize(name)}</Text>

            <View
                style={[
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: Dimensions.get("screen").height * 0.01,
                        borderBottomWidth: 1
                    }, 
                        {
                            borderBottomColor: 'rgba(0,0,0,0.1)'
                        }
                ]}
            >

                <Feather name={iconName} size={24} color="black" />

                <View
                    style={{
                        flex: 1,
                        alignItems: 'stretch'
                    }}
                >
                    <TextInput
                        ref={inputRef}
                        maxLength={maxLength}
                        onSubmitEditing={onSubmitEditing}
                        placeholder={placeholder}
                        placeholderTextColor='rgba(0,0,0,0.2)'
                        underlineColorAndroid="transparent"
                        cursorColor="black"
                        autoComplete={autoComplete}
                        secureTextEntry={secureTextEntry}
                        onChangeText={onChangeText}
                        value={value}
                        keyboardType={keyboardType}
                        passwordRules={passwordRules}
                        blurOnSubmit={false}
                        focusable={true}
                        returnKeyType={returnKeyType}
                        style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: fontScale(16),
                            paddingVertical: Dimensions.get("screen").height * 0.01,
                            paddingHorizontal: Dimensions.get("screen").width * 0.05,

                        }}
                    />
                </View>
            </View>

        </View>

    )
}

export default CustomBorderInput