import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

function ProfileScreen ({navigation}) {
    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: 'https://media0.giphy.com/media/l0HlMURBbyUqF0XQI/giphy.gif?cid=ecf05e47rki362m4mls24ph5ed2qmz5gzg45rd5y8czpu4hc&rid=giphy.gif&ct=g'}}/>
                <Text style={styles.name}>
                  Donate Hub
                </Text>
            </View>
          </View>


          <View style={styles.bodyContent}>

              <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('HomeScreen')}>
                  <View style={styles.row}>
                      <Ionicons name='location-outline' size={35} />
                      <Text style={styles.ButtonText}>Our Locations</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AddNewRequest')}>
                  <View style={styles.row}>
                      <Ionicons name='newspaper-outline' size={35} />
                      <Text style={styles.ButtonText}>Report Missing Locations</Text>
                  </View>
              </TouchableOpacity>

          </View>

          <View style={styles.bottomView}>

              <TouchableOpacity style={styles.Signoutbutton} onPress={() => navigation.navigate('Admin')}>
                  <View style={styles.row}>
                      <Ionicons name='people-circle-outline' size={35} color='#FFF' />
                      <Text style={styles.SignoutText}>Are you an admin? Login Now</Text>
                  </View>
              </TouchableOpacity>

          </View>

      </View>
    )
}

const styles = StyleSheet.create({

    container:{
      flex:1,
    },

    header:{
      paddingTop:20,
      height:230,
      backgroundColor: "#071b34",
    },

    headerContent:{
      padding:60,
      flexDirection: 'row',
      alignItems: 'center',
    },

    avatar: {
      width: 90,
      height: 90,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
    },

    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
      paddingLeft:25,
    },

    email:{
      fontSize:15,
      color:"#FFFFFF",
      fontWeight:'600',
      paddingLeft:150,
    },

    profileDetail:{
      alignSelf: 'center',
      marginTop:160,
      alignItems: 'center',
      flexDirection: 'row',
      position:'absolute',
      backgroundColor: "#ffffff"
    },

    detailContent:{
      margin:10,
      alignItems: 'center'
    },

    title:{
      fontSize:20,
      color: "#34a0a4"
    },

    count:{
      fontSize:18,
    },

    bodyContent: {
      alignItems: 'center',
      marginTop:20,
    },

    ButtonContainer:{
        backgroundColor:'white',
        paddingTop:20,
        paddingBottom:20,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        borderBottomColor:'#DEE2E6',
        borderBottomWidth:1,
    },

    Signoutbutton:{
      width:'100%',
      paddingLeft:20,
      paddingRight:20,
  },

    textInfo:{
      fontSize:18,
      marginTop:20,
      color: "#696969",
    },

    icon: {
        width:30,
        height:30,
    },

    row: {
        paddingLeft:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    description:{
      fontSize:20,
      color: "#00CED1",
      marginTop:10,
      textAlign: 'center'
    },

    ButtonText:{
        paddingLeft:15,
        fontSize: 18,
        fontWeight:'400',
    },

    SignoutText:{
      paddingLeft:15,
      fontSize: 18,
      fontWeight:'400',
      color: '#FFF',
  },

    bottomView:{
      width: '100%', 
      height: 70, 
      backgroundColor: '#FF9100', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    },

});

export default ProfileScreen;