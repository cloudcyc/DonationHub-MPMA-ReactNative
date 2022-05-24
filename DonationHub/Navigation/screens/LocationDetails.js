import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Newspaper from '../../assets/pavilion.jpeg';
import { createOpenLink } from 'react-native-open-maps';
import { useRoute } from "@react-navigation/native";


function LocationDetails ({navigation}) {
    
    const route = useRoute();
    const {height} = useWindowDimensions();
    const coordinate = { latitude: parseFloat(route.params.centreCoordinate[1]) , longitude: parseFloat(route.params.centreCoordinate[0]) };
    const openCoordinate = createOpenLink({ ...coordinate, zoom: 20 });
    
    console.log('https://nics3test8860.s3.ap-southeast-1.amazonaws.com/DonationCentreAsset/'+[route.params.centreID]+'.jpg');
    
    return(
        <View>
            <View style={styles.root}>

            <Image source={{uri: 'https://nics3test8860.s3.ap-southeast-1.amazonaws.com/DonationCentreAsset/'+[route.params.centreID]+'.jpg'}}
                style={{width: 400, height: 250}}
                resizeMode='stretch' />
            </View>

            <View style={[styles.container]}>
            <Text style={styles.title}>{route.params.centreName}</Text> 
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.title}>Address:</Text>
                    <Text style={styles.Desc}>
                        {route.params.centreAddress}
                    </Text>
                </View>

                {/* <View style={styles.container2}>
                    <Text style={styles.title}>Contact Number:</Text>
                    <Text style={styles.Desc}>03-2118 8833</Text>
                </View> */}

                <View style={styles.container2}>
                    <Text style={styles.title}>Description:</Text>
                    <Text style={styles.Desc}>
                        {route.params.centreDescription}
                    </Text>
                    
                </View>

                <TouchableOpacity
                            style={styles.loginScreenButton}
                            onPress={openCoordinate}
                            underlayColor='#fff'>
                            <Text style={styles.loginText}>View in Map</Text>
                </TouchableOpacity>

                </ScrollView>

                    {/* <View style={styles.bottomView}>

                        <TouchableOpacity
                            style={styles.loginScreenButton}
                            onPress={openPavilion}
                            underlayColor='#fff'>
                            <Text style={styles.loginText}>View in Map</Text>
                        </TouchableOpacity>
                    
                    </View> */}
            </View>

            
            
        </View>

        
    )
}

const styles = StyleSheet.create({

    root:{
        flex: 1, 
        alignItems: "center"
    },

    container:{
        paddingTop:265,
        paddingLeft:20,
        paddingRight:20,
        height:'100%',
    },

    container2:{
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor:'#b6b6b8',
        borderBottomWidth:1,
    },

    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fb5607',
    },

    Desc:{
        fontSize: 15,
        paddingTop:10,
    },

    image:{
        width:'100%',
        maxHeight:300,
    },

    row:{
        flexDirection: 'row',
        justifyContent:'center',
        height:80,
        paddingBottom:10,
    },

    backButton:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#50C878',
        width:'50%',
        justifyContent:'center'
    },

    CancelButton:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#e63946',
        width:'50%',
        justifyContent:'center'

      },

    buttonText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10,
          fontSize: 18,
          paddingBottom:10
    },

    loginScreenButton:{
        marginTop:30,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#FF9100',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:'100%',
        height:45,
        marginBottom:50,

    },

    loginScreenButton2:{
        marginTop:30,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#ffbd00',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:'50%',
        height:45,
        marginBottom:50
    },

    loginText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
    },

    bottomView:{
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width:'100%',
        marginLeft:20,
    },

});


export default LocationDetails;