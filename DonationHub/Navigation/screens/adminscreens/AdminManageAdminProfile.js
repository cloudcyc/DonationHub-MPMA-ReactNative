import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
Ionicons.loadFont();


function AdminManageAdminProfile ({navigation}) {
    const route = useRoute();

    const [currentUserID, setcurrentUserID] = useState('');
    const [userID,setuserID] = useState(route.params.userID);
    const [userFullname,setuserFullname] = useState(route.params.userFullname);
    const [userEmail,setuserEmail] = useState(route.params.userEmail);
    const [userDoB,setuserDoB] = useState(route.params.userDoB);
    const [userPassword,setuserPassword] = useState(route.params.userPassword);
    const [userConfirmPassword,setuserConfirmPassword] = useState('');
    const [userRole,setuserRole] = useState(route.params.userRole);
    const [createdTime,setcreatedTime] = useState(route.params.createdTime);

    const [date, setDate] = useState(new Date())
    // const [text, setText] = useState('Select DOB');
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');


    const onChange = ( event, selectedDate) => {
        
        if (event.type == 'dismissed'){
            setShow(false);
            
        }else if (event.type == 'set'){
            const currentDate = selectedDate || date;
            setDate(currentDate);
            
            let tempDate = new Date(currentDate);
            let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
            setuserDoB(fDate);
            setShow(false);
        }
        
        
    }

    const showMode = (cureentMode) => {
        setShow(true);
        setMode(cureentMode);
    }
    const retrieveUserID  = async () =>{
        try {
          const value = await AsyncStorage.getItem('userID')
          if(value != null) {
            // value previously stored
            console.log(value);
            setcurrentUserID(value);
            
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }

    useEffect(() => {
        retrieveUserID();
      }, []);

    const updateUserFunction = async () => {
        if (userRole == null){
            alert("User must have a role.")
        }
        else
        {
            let res = await fetch("https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/users?UpdateUser=true", {
                method: "POST",
                body: JSON.stringify({
                    userID: userID,
                    userEmail: userEmail,
                    userFullname: userFullname,
                    userPassword: userPassword,
                    userDoB: userDoB,
                    userRole: userRole,
                    createdTime: createdTime
                }),
            }).then((res) => {
                if (res.status == 200) {
                        alert("User update successfully.")
                        navigation.navigate('AdminManageAdminScreen',{userID: currentUserID})
                    } else {
                        alert("User update failed Error:" + res.status)
                        console.log("Some error occured: ");
                        console.log(res.status)
                        console.log(res)
                    }
            });
        }
    }

    return(
        <View style={styles.root}>

            <Text style={styles.title}>Manage Admin Profile</Text>
            <Text style={styles.title2}>Update Admin's Profile Information Here</Text>

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
                    placeholder="Enter Name Here"
                    underlineColorAndroid="transparent"
                    editable={true}
                    selectTextOnFocus={false}
                    value={userFullname} onChangeText = {(val) => setuserFullname(val)}
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
                    placeholder="Enter Email Here"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    editable={false}
                    selectTextOnFocus={false}
                    value={userEmail} onChangeText = {(val) => setuserEmail(val)}
                />
            </View>

            <TouchableOpacity style={styles.sectionStyle} onPress={() => showMode('date') }>
                <Image
                    source={{
                    uri:
                        'https://cdn-icons.flaticon.com/png/512/591/premium/591638.png?token=exp=1654161253~hmac=492a2b141cafe63e458129caf10a4a0e',
                    }}
                    style={styles.imageStyle}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder={userDoB}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="black" 
                    selectTextOnFocus={false}
                    editable={false}
                    value={userDoB} 
                    // onChangeText = {(val) => setuserDoB(val)}
                />
            </TouchableOpacity>

            {show && (
                    <DateTimePicker
                    testID = 'dateTimePicker'
                    value = {date}
                    mode = {mode}
                    is24Hour = {true}
                    display = 'default'
                    onChange = {onChange}
                />)}

            <View style={styles.sectionStyle2}>
                <Picker
                    selectedValue={userRole}
                    onValueChange={(value, index) => setuserRole(value)}
                    mode="dropdown" // Android only
                    style={styles.picker}>
                    

                    <Picker.Item label="Select a role" value= {null} />
                    <Picker.Item label="Admin" value="Admin" />
                    {/* <Picker.Item label="Member" value="Member" /> */}

                </Picker>

            </View>

            <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => updateUserFunction()}
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

export default AdminManageAdminProfile;