import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import fontScale from '../../utils/fontScale'

export default function ReportEmergency({ navigation }) {
  return (
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
          alignItems: "center"
        }}
      >

        {/* header left */}
        <View style={{ alignItems: 'flex-start' }}>
          <Pressable
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={fontScale(30)} color="rgba(0,0,0,0.7)" />
          </Pressable>
        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})