import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';


function HomeScreen ({navigation}) {
    return(
        <ScrollView style={styles.root}>

            <View style={styles.containerSearch}>
                <TextInput placeholder='Search Donate Hub'/>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('LocationDetails')}
                style={styles.roundButton}>
                <Image style={styles.icon} source={{
                uri:
                    'https://s1.cdn.autoevolution.com/images/news/google-maps-is-getting-a-feature-that-just-makes-sense-these-days-150219_1.jpg',
                }}/>
                <Text style={styles.locationtitle}>Pavilion Kuala Lumpur</Text>
                <Text style={styles.locationtitle2}>Phone:      03-2118 8833</Text>
                <Text style={styles.locationtitle2}>Location:  Lot 5.100.00 Level 5, Pavilion Elite</Text>


            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Pavilion')}
                style={styles.roundButton}>
                <Image style={styles.icon} source={{
                uri:
                    'https://s1.cdn.autoevolution.com/images/news/google-maps-is-getting-a-feature-that-just-makes-sense-these-days-150219_1.jpg',
                }}/>
                <Text style={styles.locationtitle}>KLCC Malaysia</Text>
                <Text style={styles.locationtitle2}>Phone:      03-2382 2828</Text>
                <Text style={styles.locationtitle2}>Location:  Lot 316-A, Level 3</Text>
            </TouchableOpacity> 
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    root:{
        padding:20,
        height:'100%',
    },

    roundButton: {
        width: '100%',
        height: 270,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
    },

    icon: {
        width:'100%',
        height:150,
        borderRadius:5,
        paddingBottom:5,
    },

    locationtitle: {
        fontWeight:'500',
        padding:5,
        paddingTop: 8,
        fontSize:18
    },

    locationtitle2: {
        fontWeight:'500',
        padding:5,
        paddingTop: 5,
        color:'grey'
    },

    containerSearch:{
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        marginBottom:20,
    },

});



export default HomeScreen;