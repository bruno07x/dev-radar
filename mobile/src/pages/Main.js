import React, {useEffect, useState} from "react";
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import api from "../services/api";
import { connect, disconnect, subscribeToNewDevs } from "../services/socket";

function Main( { navigation } ) {
    // Iniciando estado como nulo
    const [ currentRegion, setcurrentRegion ] = useState(null);
    const [ devs , setDevs ] = useState([]);
    const [ techs , setTechs ] = useState('');
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy : true,
                });
                const { latitude, longitude } = coords;
                setcurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta : 0.04,
                    longitudeDelta : 0.04,
                });
            }
        }
        loadInitialPosition();
    }, []);

    useEffect( () => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs] );

    function setupWebsocket() {
        disconnect();
        const { latitude, longitude } = currentRegion;
        connect( latitude, longitude, techs);
    }
    async function loadDevs() {
        const { latitude, longitude } = currentRegion;
        const response = await api.get('/search', {
            params : {
                latitude : latitude,
                longitude : longitude,
                techs : techs
            }
        });
        setDevs(response.data.devs);
        setupWebsocket();
    }
    function handleRegionChanged( region ) {
        setcurrentRegion(region);
    }
    if (!currentRegion) {
        return null;
    }
    // Style está com chaves duplas pois a primeira é referente ao código JS que necessita ser inserido dentro de chaves
    // Já a segunda chaves é referente ao objeto JS que também precisa, nesse caso o objeto é para usar código CSS
    // return <MapView style={{flex: 1}}></MapView>
    return <>
        <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
            {devs.map( dev => (
                <Marker key={dev._id} coordinate={{latitude: dev.location.coordinates[1], longitude : dev.location.coordinates[0]}}>
                    <Image style={styles.avatar} source={{uri : dev.avatar_url}}></Image>
                    <Callout onPress={() => {
                        navigation.navigate( 'Profile', { github_username : dev.github_username } );
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                        </View>
                    </Callout>
                </Marker>
            ))}
        </MapView>
        <View style={styles.search}>
            <TextInput
                style={ styles.searchInput }
                placeholder=" Buscar desenvolvedores por técnologias! "
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={ setTechs }></TextInput>
            <TouchableOpacity style={styles.loadButton} onPress={loadDevs}>
                <Feather name="map-pin" size={20} color="#fff"></Feather>
            </TouchableOpacity>
        </View>
    </>
}

const styles = StyleSheet.create({
    map : {
        flex : 1,
    },
    avatar : {
        width : 54,
        height : 54,
        borderRadius: 4,
        borderWidth : 4,
        borderColor : '#7d40e7'
    },
    callout : {
        width : 260,
    },
    devName : {
        fontWeight : 'bold',
        fontSize : 16,
    },
    devBio : {
        color : '#666',
        marginTop : 5
    },
    devTechs : {
        marginTop : 5
    },
    search : {
        position : 'absolute',
        top : 20,
        left : 20,
        right : 20,
        zIndex : 5,
        flexDirection : 'row'
    },
    searchInput : {
        flex : 1,
        height : 50,
        backgroundColor : '#fff',
        color : '#333',
        borderRadius : 25,
        paddingHorizontal : 20,
        fontSize : 16,
        shadowColor : "#000",
        shadowOpacity : 0.2,
        shadowOffset : {
            width : 4,
            height : 4,
        },
        elevation : 2
    },
    loadButton : {
        width: 50,
        height : 50,
        backgroundColor : '#8e4dff',
        borderRadius : 25,
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : 15
    }
});

export default Main;