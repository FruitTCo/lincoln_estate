import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import fontScale from '../../utils/fontScale'
import { Caption } from 'react-native-paper'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import { SkypeIndicator } from 'react-native-indicators'
import client from '../../utils/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ReportEmergency({ navigation }) {

  const [token, setToken] = useState(null)

  const getProfile = async () => {
    let res = await AsyncStorage.getItem('currentUser');
    let userdata = JSON.parse(res)
    setToken(userdata.token)
  }

  useEffect(() => {
    getProfile()
  }, [])

  const [selectedEmergency, setSelectedEmergency] = useState(null)

  const [location, setLocation] = useState(null);

  const [verifying, setVerifying] = useState(false)

  const [formValid, setFormValid] = useState(false)

  const _setSelectedEmergency = (value) => {
    setSelectedEmergency(value)
  }

  const _setSFormValid = (value) => {
    setSelectedEmergency(value)
  }

  // reset selected emergency and form valid value after load
  useEffect(() => {
    _setSFormValid(null)
    _setSelectedEmergency(null)
  }, [])


  // get current location
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission to access location was denied")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      console.log(location);
    })();
  }, []);

  // create an alert
  const _showAlert = ({ text, onPress }) => {
    return Alert.alert(
      "",
      text,
      [
        {
          text: "Cancel",
          onPress: onPress,
          style: "cancel"
        },
      ]
    );
  }

  // change button color when info is complete
  useEffect(() => {
    if (selectedEmergency && location) return setFormValid(true)
  }, [selectedEmergency, location])

  const validateEmergency = () => {
    setVerifying(true)
    if (!selectedEmergency || !location) {
      setVerifying(false)
      return _showAlert({ text: "Select an emergency" })
    }
  }

  const _sendEmergency = async () => {
    await validateEmergency()

    try {

      let res = await client.post(
        '/send-emergency',
        {
          location: location,
          emergencyType: selectedEmergency
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `JWT ${token}`,
          },
        }
      );

      if (res.data.success === false) {
        _showAlert({ text: res.data.message })
        console.log(res.data);
      } else {
        setVerifying(false)
        _showAlert("Emergency request has been submitted", () => {
          navigation.navigate("Home")
        })
      }

      setVerifying(false)

    } catch (error) {
      setVerifying(false)
      setFormValid(false)
      _showAlert(error)
      _setSelectedEmergency(null)
      console.error(error);
    }
  }

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
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >

        {/* header left */}
        <View style={{ alignItems: 'flex-start', }}>
          <Pressable
            onPress={() => navigation.goBack()}
          >
            <Image
              source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAAAS0lEQVRIie3SsQmAQBREwSlMOLQny9QezLQLQ0Ojf6ewr4FhYUlPDVslMOHEHOANWAIMBa5fA3BgrQTotKQ7VPquQIHGQQ17NfKNbuCzHJ2P10S/AAAAAElFTkSuQmCC" }}
              style={{
                width: fontScale(26),
                height: fontScale(26),
              }}
            />
          </Pressable>
        </View>

        {/* heading */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              // marginBottom: Dimensions.get("window").height * 0.02,
              fontSize: fontScale(22),
              color: "black",
              fontFamily: "Poppins_400Regular",
              textAlign: "center"
            }}
          >Emergency</Text>
        </View>

        <View
          style={{
            width: fontScale(26),
            height: fontScale(26),
          }}
        ></View>

      </View>

      {/* body */}
      <View
        style={{
          flex: 1,
          paddingTop: Dimensions.get("window").height * 0.025,
          paddingHorizontal: Dimensions.get("window").height * 0.025,
          // backgroundColor: "lightblue"
        }}
      >

        {/* map info */}
        <View
          style={{
            flex: 1,
            borderRadius: Dimensions.get("window").height * 0.02,
            overflow: "hidden"
          }}
        >
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={location === null ? null : {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
            customMapStyle={mapStyle}
            style={{ flex: 1 }}
          >
            {location === null ? null :
              <Marker
                style={{ color: "blue" }}
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Fontisto name="map-marker-alt" size={fontScale(30)} color={!formValid ? "grey" : "blue"} />
              </Marker>
            }
          </MapView>
        </View>

        {/* emergency btn */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: Dimensions.get("window").height * 0.03,
          }}
        >

          {/* sos */}
          <Pressable
            style={{
              width: Dimensions.get("window").width * 0.25,
              backgroundColor: "rgba(0,0,0,0.1)",
              alignItems: "center",
              paddingVertical: 30,
              borderRadius: fontScale(20),
              opacity: selectedEmergency === "sos" ? 1 : 0.2
            }}

            onPress={() => _setSelectedEmergency("sos")}
          >
            <Image
              source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABiUlEQVRIie3VP0hXURQH8M8TcclFyRpsySFUaHZpCRzFSYIWFzcXl1IEBxEsiyBaTRpSaqtBcBBJEKmhzdLNyT8glWUODlo23Cvpr/fuU2go8AuX9+555/u959x7zn2ZYtThJtpxHRdxCVXYwiesYA7z+JzQOoE2vMIBDk85fmAaN1LC1/DmDKJFYwEtleLd2P0L4kdjD33IMjzE3URmq3iNZXzFT9SjFR3xWYTH8K0kmqmEwKMS7k4V3icEoDHx7UoJ9y004EMiiqGEQE+CtySUtqJFttGLrCTKLqxVcD8KPXMCDZjFF4znOSRwAfewiRlcPgP3P0Mz3mHf74OCGjwQtmADY9GW4oDqigWeoQlPhLvoyHkEd/Aizvuj2GCCk4vveJpj38DksflUtKU4uXgp3IwLQlXURvshho/5DUdbipOLWoxG54NILlugiFOKCezE97wtWi/h4M9DvoWrQuN0Ct0NzzEgdHWG20IlpTi5WBJS38ei8BMilOT9mMm6sNc1JZxz/CP4BY7Hsx5yA8pCAAAAAElFTkSuQmCC" }}
              style={{
                width: fontScale(34),
                height: fontScale(34),
              }}
            />
          </Pressable>

          {/* breakin */}
          <Pressable
            style={{
              width: Dimensions.get("window").width * 0.25,
              backgroundColor: "rgba(0,0,0,0.1)",
              alignItems: "center",
              paddingVertical: 30,
              borderRadius: fontScale(20),
              opacity: selectedEmergency === "breakin" ? 1 : 0.2
            }}

            onPress={() => _setSelectedEmergency("breakin")}
          >
            <Image
              source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEkElEQVR4nO2by48VRRTGfxjGBBllYVh4mUEDTKILhcSQmChsRBMFH6jEBQtd+EhYaaJgiHGlCeDGx8aYoGx8RGJ8BNGARGT0D9AVSnxECXEGhOCMBMbhXhfnlN22/b6n6nbH+ZJKV9+p+vo71aeqTp/ugTBYB7wOHAWmgV5G+RP4HngDuDWQNq8YAw6TbXBRGVeOVmItcBoxZAJ4FlgFLMzpcxlwPbAdOKF9T/iV6QdjRMbvBS6vwbEIeAV4wVBXMDi33wvMG7CW4FhH5PZ17nwaHgb+AG424vsHl1gTAg/q8VVgyohzMTKYDxnxecVRxANWGnKuUs7vDDm9YQoRO2zIOayc04ac3uD28FbwWq4BQ8Cu2Hnd4CerOOwE5hvqNsOL2BudVXYGsqkSTiLiVut5lsv28/stWp/sS2kMllPABTw+ttbkNRoXXC0FjhFuChzTazYC1wC/E854V04BVwewrxDvIoL2AUvwvw2OAPu1/o6H61SGu/sjep4cgA3AF8gdO6X1DSk8Re3ivKNEXjBwuNU/bQAeI9uFH41xlGmXNgAnza2pgbcRMfuRQYgLndT6E8jz/SLgSf3ttxhHmXaOdxT4VOtv9SveIqJ6DnkEvgP4NfG35FqQtX2VbQfwix4n9dqNwHJkMZwgulMdxH2zXPuRWP+idp3Y+QSy+C33bFNtOKHb9Hw9cIhocTsE3Kl/u1JLUbtn+PfUajSc0AvIIHRS2owi26Zru09/S6KjHBfwNAA+QsoqIs8ClwILKvRpXBichLtTa4BPiFb4eDkNvIm4/2JgD1EWOV4mlWMNLZoC5xChlhmhK5TTPCPk48nNRWdpc78urkpwm8HHAHyrxxsNOV2O4RtDTsDPABzW472GnPfo8UtDTm/oALPADLDCgG8Zsg3+RTQVGo89yKL1vgHXh8q124ArGEaAM4jwp/rg2aocZ5BcQ6twP9AFLgJP1+i/Vft2gY2GuoJiC2JAD/iAcmvCCiK37wKPe1MXCPcRTYcZ4D1gM3AtEiwNa30z8jp9hihatNxJBoolyCJWNuG5G9tAqjFwBn4M/IyEzee0/hEtivfrosjA4APg8y1OKzA3AIMWMGhYZIWXAQ8AtyER4Aj95wKy1oFpJPN8HDiIhNo/9nmt2lgJfE6993ppW1ynJtdB4AYP9mViPvAy8sTXQ/J6ryFBy1Ly83vu+8FtKX9zmd8DOf0XIC9EN+o1z2qfWeAlAnw5shDJ0fWA88DzVHP39Uh4G88YJzO/t1fgG1YN54myy3mf4vaFIeAI1V10PMGzvQZHGtfXOW2GrIyOY0dN0UdSuNYi68dUH1zjOe12mFgcw03Io+ksUX6uiViNaLyIaDaDe4vTyK+zEthF9LxhguuInunbVLqqPRdlIsG7acHrqBTMA+6yIDqAjOgmC7JA2IRo/syC7Ccls0hxh8IYovkHC7K8//Kqsj8PohS+SyyzBpSJrHqxerdE+1AwiQrdaLYNpXTP5QMqtG2jFxRizgMqtC36xi90sFR03VIe+7/3gDJ3re1zP9fGMh7wlZGQQSCZjPkP/gY5DHx3cvXDMAAAAABJRU5ErkJggg==" }}
              style={{
                width: fontScale(34),
                height: fontScale(34),
              }}
            />
          </Pressable>

          {/* fire */}
          <Pressable
            style={{
              width: Dimensions.get("window").width * 0.25,
              backgroundColor: "rgba(0,0,0,0.1)",
              alignItems: "center",
              paddingVertical: 30,
              borderRadius: fontScale(20),
              opacity: selectedEmergency === "fire" ? 1 : 0.2
            }}

            onPress={() => _setSelectedEmergency("fire")}
          >
            <Image
              source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAFTUlEQVRogc2ae4hXRRTHP79Hq9X6y1+2WdtqUvbaUNMeQg8SCUItoqCg0IIisBIxQnrQHxH1lxBoD4goM4owyOy19GCtDDWKYqstdKlNCmuzzFJb2M319sc5w9y9v/uae+/uzy9cZu/MnDPfub+ZM+ecWSgWZeAL4BvgtIJ1jytmAZ4+u4GZzaWTHSuQSRzRcg9wXlMZZcQmZAIrgS/1773AvGaScsVE4AAwDNSBE4DtyGT+Bi5rHjU3XIOQft9XNwn4WOsPApc3gZczNiKElwfqj0Mm5wGHgCvGmZcTpgJDwAjhZncC8C4ymf3AheNHzQ0PIiTfjunTAnRxFE+mDPQjBBcl9D0e2Iq1ZkeVaV6MEOtDJpWEGvCZyvwEnDJ21NywAyG1ykGmDnytcp8jBqGpWISQ2Yd8aRdMQ05+D9gMVIqllh4l5Gt6wEMZdcxFzhcPWFsQL2dci920rTn0LAEOq66bC+DlhCrQq4OvLkDfvarrH+DMAvSlxnId+BfSbdRuxImMslAl4C3s5m8pgGMiasCADnpbSpl/tf93iBcQhinIh/GANTk5psLjOthXpDs3AH7ABly9QFtEvyuR/TLCGLv+HcCgElroILdNZQ5ouR1x+8OwTvtsRZbcmGADyT5VGLZgJ2+W2UbCidaBP7TPTZmZxmAO8pMfBs53lP0AITYRuEH1xFk8EzLvBo7NQjYOxg1/LoOsiRSr+v6ovg8BF4T0ryKGISy+yYXZSEJhiGxpnp2I625QAT5CiH6LxCtBLNP2XaQ3Kol4SZW+kEG2hOyL3kB9B3bzPxwi1wL8qu0LMozbgOlIQuEI0JlBfpqSeS+kbSXWmoWdL2u0/fkM4zbgMZItVRk5uXtoPL1vVPknQuQqSFbSA54OaZ+H9edyLa8S8KMquy6m33xGH3h+l/5Jrb81QvZ6bR9ETvfg+L9p+0WO3EdhDjbGjvN/HsFOxANe8bWZACrKZJd8fcLM8avYpF9mrFIlmxL6GU94LXYyC4EZyN7aS/wpfY/KfB/Stlrb1rsQD8J8jbgwdq72+R2x/0bmU+B+/fu1hHEmI6bdozHxbeKebY7cR6FHlVwV0+cZ7bNO36djAyWzvm9JMZZxY4JL6FKt/zk16xDsVyVnRLTXsGeB31t9B7vEBpHUaRJMbmxDoP5cn55MKGG/bNCaGNyNDYb8uB07kddTjrcEGx740Ya9qshkgivYe46omNxcHdwZqDdfMcls+zFT+/8ZqK9p/Qg5Mi1/qZJTQ9o6tW0YODHQZjIsOxwGn6L6/gvUz8Aak0hU4xqRuKAOtCMb14/FWnYjE/bDAy5J0B3EsJZlZPIj+t6hZexEktbcTi3DXG1zcfNmgo60qGu5DzsJgIu17IsTTppIt5Zh5neWlj0JOtKiXcuBQL0JqT/Mo/wcZMMfpNGEmgxhe1AoI0yKabOvrg1ZcnFHAJD8i+xCwtRWxI0wqCBXBCC3UEXAXMtt8dWtAI4BPkGuLnJhAdZxNBuvhP1SUXkqF0xALkw9bMwzFXvYXl3AGAC8rAq7kS8EYgg8xBfKi6Wqy+y3EjZHkMvHCmIyktEwLkQFeErfu3LqLmPd+GVaZ8KCQ8BZOfU3oBOx5R7wBrKmzck/P4feu1RHP/JrG4/ZA+7IoTcWs7F53z7k6sxkQrLkn85GMvAeku96ETuJBwrgG4t2xIp4gWc9binOk7C5qz2Im+4hjup9BfKNRRWJ3IylMc+zpPNQT8cmHfxPP03674iTkfDWmMk0QdQkbL7KPANIbsv1HrJw1JDIrgtx4ePQihy0/chyXEp0Zj41/geJOYpT0MnvRwAAAABJRU5ErkJggg==" }}
              style={{
                width: fontScale(34),
                height: fontScale(34),
              }}
            />
          </Pressable>
        </View>

        {/* send btn */}
        <TouchableOpacity
          style={{
            backgroundColor: !formValid ? "rgba(0,0,0,0.1)" : "blue",
            alignItems: "center",
            paddingVertical: Dimensions.get("window").height * 0.02,
            marginTop: Dimensions.get("window").height * 0.025,
            borderRadius: "100%",
          }}
          onPress={() => _sendEmergency()}
        >
          <Text
            style={{
              fontSize: fontScale(20),
              fontFamily: "Poppins_500Medium",
              color: "#fff"
            }}
          >Send</Text>
        </TouchableOpacity>

      </View>


      {/* actity loader */}
      {verifying === false ? null :
        <View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              backgroundColor: "rgba(0,0,0,0.3)",
              justifyContent: "center",
              alignItems: "center"
            }
          ]}
        >
          <SkypeIndicator color="blue" />
        </View>
      }

    </SafeAreaView>
  )
}

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]