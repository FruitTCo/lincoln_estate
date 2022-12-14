import { View, Text, Dimensions } from 'react-native'
import React from 'react'

export default function Spacer() {
  return (
    <View style={{
        height: Dimensions.get("screen").height * 0.03,
    }} />
  )
}