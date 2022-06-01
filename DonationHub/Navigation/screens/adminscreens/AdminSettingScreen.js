import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
Ionicons.loadFont();

function AdminSettingScreen ({navigation}) {
  const isFocused = useIsFocused(); //used to refresh upon entering new screen
  
  const [userID,setUserID] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const [userFullname, setUserFullname] = useState('Testing');


  const getUserFunction = async(inputUserID) => {
    var getUsersAPI = 'https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserID='+ inputUserID;
    console.log(getUsersAPI);
    fetch(getUsersAPI).then((response) => response.json()).then((json) => {
      // console.log(json);
      // console.log(json[0].userFullname);
      setUserInfo(json);
      // console.log(userInfo);
      setUserFullname(json[0].userFullname);
      // console.log(userFullname);
      
      
    }).catch((error) => {
      console.error(error);
    });

  };

  const retrieveUserID  = async () =>{
    try {
      const value = await AsyncStorage.getItem('userID')
      if(value != null) {
        // value previously stored
        getUserFunction(value);
        
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }


  useEffect(() => {
    retrieveUserID();
  }, [navigation,isFocused]);

    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: 'https://media0.giphy.com/media/l0HlMURBbyUqF0XQI/giphy.gif?cid=ecf05e47rki362m4mls24ph5ed2qmz5gzg45rd5y8czpu4hc&rid=giphy.gif&ct=g'}}/>
                <Text style={styles.name}>
                Welcome, {"\n"}
                {userFullname}
                  
                </Text>
            </View>
          </View>

          <ScrollView style={styles.bodyContent}>

            <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AdminEditProfileScreen', userInfo[0])}>
                  <View style={styles.row}>
                      <Ionicons name='person-circle-outline' size={35} />
                      <Text style={styles.ButtonText}>Edit Profile</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AdminManageAdminScreen')}>
                  <View style={styles.row}>
                      <Ionicons name='people-circle-outline' size={35} />
                      <Text style={styles.ButtonText}>Manage Admins</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AdminViewAllLocationScreen')}>
                  <View style={styles.row}>
                      <Ionicons name='location-outline' size={35} />
                      <Text style={styles.ButtonText}>View All Location</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('AdminAddLocation')}>
                  <View style={styles.row}>
                      <Ionicons name='navigate-circle-outline' size={35} />
                      <Text style={styles.ButtonText}>Add New Location</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ButtonContainer} onPress={() => navigation.navigate('RequestScreen')}>
                  <View style={styles.row}>
                      <Ionicons name='newspaper-outline' size={35} />
                      <Text style={styles.ButtonText}>View All Request</Text>
                  </View>
              </TouchableOpacity>

          </ScrollView>

          <View style={styles.bottomView}>

              <TouchableOpacity style={styles.Signoutbutton} onPress={() => navigation.navigate('HomeTabs')}>
                  <View style={styles.row}>
                      <Ionicons name='power-outline' size={35} color='#FFF' />
                      <Text style={styles.SignoutText}>Sign Out</Text>
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
      height:195,
      backgroundColor: "#071b34",
    },

    headerContent:{
      padding:30,
      flexDirection: 'row',
      alignItems: 'center',
    },

    avatar: {
      width: 100,
      height: 100,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
    },

    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
      paddingLeft:30,
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
      //height:'100%'
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
      backgroundColor: '#e63946', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    },

});

export default AdminSettingScreen;