import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Logo from '../../../assets/Donatehublogo.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
Ionicons.loadFont();



function LoginScreen ({navigation}) {
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [userInfo, setUserInfo] = useState([]);
    const [userID, setUserID] = useState(null);
    
    const loginFunction = async () => {
        // console.log(getUsersAPI);
        var getUsersAPI = 'https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserEmail='+ userEmail +'&inputUserPassword='+ userPassword;
        fetch(getUsersAPI).then((response) => response.json()).then((json) => {
            if (json.length > 0){
                alert("Login Success");
                if (storeData(json[0].userID)){
                    navigation.navigate('Admin');
                }
                else{
                    console.log("fail to store");
                }

              }else{
                alert("Login failed. Incorrect Email or Password");
                
              }  
        }).catch((error) => {
            console.log("Wrong API");
            console.error(error);
        });
  
    }
    
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('userID', value)
        } catch (e) {
          // saving error
          console.log("Storing session fail");
          console.log(e);
        }
      }
   
    return(
        <View style={styles.root}>
           <Image 
           source={Logo}
           style={[styles.logo]}
           resizeMode="contain"
           />

            <View style={styles.sectionStyle}>
                <Image
                    source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/546/546394.png',
                    }}
                    style={styles.imageStyle}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Email Here"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    value={userEmail} onChangeText = {(val) => setUserEmail(val)}
                />
            </View>

            <View style={styles.sectionStyle}>
                <Image
                    source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',
                    }}
                    style={styles.imageStyle}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Password Here"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    value={userPassword} onChangeText = {(val) => setUserPassword(val)}
                    
                />
            </View>

            <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => loginFunction()}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    root:{
        padding:20, 
    },

    logo:{
        width:'100%',
        maxHeight:200,
        marginLeft:20,
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 50,
        borderRadius: 5,
        marginTop: 10,
        marginBottom:10,
    },

    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        marginRight:10,
    },

    loginScreenButton:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#FF9100',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:'100%',
        height:45,
      },

    loginText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
    },

    container:{
        width: '100%',
        padding: 5,
        marginVertical: 5,  
        alignItems: 'center',
        borderRadius: 5,
    },

    container2:{
        width: '100%',
        padding: 5,
        marginVertical: 5,  
        alignItems: 'center',
        borderRadius: 5,
    },

    container3:{
        padding: 10,
    },
    
    text:{
        fontWeight: 'bold',
        color: 'gray',
    },

    text2:{
        fontWeight: 'bold',
        color: '#d9dadb',
    },

    textInputStyle: {
        flex: 1
    },

})

export default LoginScreen;