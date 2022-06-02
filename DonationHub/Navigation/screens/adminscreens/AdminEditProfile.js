import React,{useState} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native";
Ionicons.loadFont();


function AdminEditProfileScreen ({navigation}) {
    const route = useRoute();
    
    const [userID,setuserID] = useState(route.params.userID);
    const [userFullname,setuserFullname] = useState(route.params.userFullname);
    const [userEmail,setuserEmail] = useState(route.params.userEmail);
    const [userDoB,setuserDoB] = useState(route.params.userDoB);
    const [userPassword,setuserPassword] = useState(route.params.userPassword);
    // const [userRole,setuserRole] = useState(route.params.centreCoordinate[0]);
    

    return(
        <View style={styles.root}>

            <Text style={styles.title}>Update Profile</Text>
            <Text style={styles.title2}>Update Your Profile Information Here</Text>

            <View style={styles.sectionStyle}>
                <Image
                    source={{
                    uri:
                        'https://cdn-icons-png.flaticon.com/512/1828/1828439.png',
                    }}
                    style={styles.imageStyle}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Name Here"
                    underlineColorAndroid="transparent"
                    selectTextOnFocus={false}
                    value={userFullname} onChangeText = {(val) => setuserFullname(val)}
                />
            </View>

            <View style={styles.sectionStyle}>
                <Image
                    source={{
                    uri:
                    'https://cdn-icons.flaticon.com/png/512/591/premium/591638.png?token=exp=1654161253~hmac=492a2b141cafe63e458129caf10a4a0e',
                }}
                    style={styles.imageStyle}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="DD-MM-YYYY"
                    underlineColorAndroid="transparent"
                    selectTextOnFocus={false}
                    keyboardType="number-pad"
                    value={userDoB} onChangeText = {(val) => setuserDoB(val)}
                />
                
            </View>

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
                    editable={false}
                    selectTextOnFocus={false}
                    value={userEmail} onChangeText = {(val) => setuserEmail(val)}
                />
            </View>
            
            
            
            <View style={styles.sectionStyle}>
            
            <Ionicons name='lock-closed-outline' size={30} style={{paddingLeft:5, paddingRight:7}}/>

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your Old Password Here"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}

                />
            </View>

            <View style={styles.sectionStyle}>
            <Ionicons name='lock-closed-outline' size={30} style={{paddingLeft:5, paddingRight:7}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Your New Password Here"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                />
            </View>
            <Text style={styles.title2}>Note: Changing password required to enter old and new password.</Text>

            <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => navigation.navigate('Admin')}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Update Profile</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    root:{
        padding:20, 
        //backgroundColor: '#D8F3DC',
        height: '100%',
    },

    logo:{
        width:'100%',
        maxHeight:200,
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

    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fb5607',
        margin: 10,
        marginBottom:5,
        alignSelf:'center'
    },

    title2:{
        fontSize: 15,
        color: 'gray',
        paddingBottom:20,
        alignSelf:'center'
    },

    textInputStyle: {
        flex: 1
    },

})

export default AdminEditProfileScreen;