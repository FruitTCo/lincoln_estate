import { Dimensions, Image } from 'react-native'
import React from 'react'

const LogoTitle = () => {
  return (
    <Image
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBbVDF_KQMR0txsNVVIhhWxUfnYRawJPK5pw&usqp=CAU'
      }}
      style={{
        width: Dimensions.get("window").width * 0.1,
        height: Dimensions.get("window").width * 0.1,
        resizeMode: "contain"
      }}
    />
  )
}

export default LogoTitle