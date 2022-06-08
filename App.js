// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */
// import { locations } from './Data/Data'
// import React, {useState} from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
//
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
//
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
//
// import MapViewDirections from 'react-native-maps-directions';
//
// // import Styled from 'styled-components/native';
//
// interface IGeolocation {
//     latitude: number;
//     longitude: number;
// }
//
// const App: () => Node = () => {
//
//     const [location, setLocation] = useState<IGeolocation>({
//         latitude: 6.586622,
//         longitude: 79.975817,
//     });
//
//   return (
//
//
//
//
//
//
//       <View style={styles.container}>
//
//
//
//
//
//           <MapView
//               // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//               style={styles.map}
//
//               initialRegion={{
//                   latitude: location.latitude,
//                   longitude: location.longitude,
//                   latitudeDelta: 0.0922,
//                   longitudeDelta: 0.0421,
//               }}
//               onRegionChange={region => {
//                   setLocation({
//                       latitude: region.latitude,
//                       longitude: region.longitude,
//                   });
//               }}
//               onRegionChangeComplete={region => {
//                   setLocation({
//                       latitude: region.latitude,
//                       longitude: region.longitude,
//                   });
//               }}
//           >
//               <Marker
//                   coordinate={{
//                       latitude: location.latitude,
//                       longitude: location.longitude,
//                   }}
//                   title="this is a marker"
//                   description="this is a marker example"
//               />
//
//               <Marker coordinate={{latitude: 6.586622, longitude: 79.975817}}/>
//               {/*<Marker coordinate={{latitude: 6.587556, longitude: 79.963391}}/>*/}
//               <MapViewDirections
//                   origin={{latitude: 6.586622, longitude: 79.975817}}
//                   destination={{latitude: location.latitude, longitude: location.longitude}}
//                   apikey={'AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8'}
//                   strokeWidth={3}
//                   strokeColor="hotpink"
//               />
//
//           </MapView>
//
//
//       </View>
//
//   );
// }
// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         // height: 600,
//         // width: 400,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });
//
//
//
// export default App;


import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

export default function App() {
    const [ pin, setPin ] = React.useState({
        latitude: 6.586622,
        longitude: 79.975817,
    })
    const [ region, setRegion ] = React.useState({
        latitude: 6.586622,
        longitude: 79.975817,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    return (
        <View style={{ marginTop: 50, flex: 1 }}>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 6.586622,
                    longitude: 79.975817,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                provider="google"
            >
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                <Circle center={region} radius={1000} />
                <Marker
                    coordinate={pin}
                    pinColor="black"
                    draggable={true}
                    onDragStart={(e) => {
                        console.log("Drag start", e.nativeEvent.coordinates)
                    }}
                    onDragEnd={(e) => {
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                >
                    <Callout>
                        <Text>I'm here</Text>
                    </Callout>
                </Marker>
                <Circle center={pin} radius={1000} />
            </MapView>
            <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details)
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                }}
                query={{
                    key: "AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8",
                    language: "en",
                    components: "country:lk",
                    types: "establishment",
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                    listView: { backgroundColor: "white" }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
})
