import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';


function RequestDetailScreen ({navigation}) {

    const {height} = useWindowDimensions();

    return(
        <View>

            <ScrollView style={[styles.container]}>

                <View style={styles.container2}>
                    <Text style={styles.title}>Request ID:</Text>
                    <Text style={styles.Desc}>ID000001</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.title}>Name:</Text>
                    <Text style={styles.Desc}>Elon Mask</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.title}>Phone Number:</Text>
                    <Text style={styles.Desc}>0123456789 Call me baby</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.title}>Name of Location:</Text>
                    <Text style={styles.Desc}>Genting Highland</Text>
                </View>


            </ScrollView>

            <View style={[styles.bottomView]}>

                <TouchableOpacity
                    style={styles.CancelButton}
                    onPress={() => navigation.navigate('Admin')}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Admin')}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>

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
        paddingTop:30,
        paddingLeft:20,
        paddingRight:20,
        height:'100%'
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
        backgroundColor:'#FF9100',
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

    SignoutText:{
        paddingLeft:15,
        fontSize: 18,
        fontWeight:'400',
        color: '#FFF',
    },

    bottomView:{
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },

});


export default RequestDetailScreen;