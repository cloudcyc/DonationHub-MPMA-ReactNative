import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
Ionicons.loadFont();


function AddNewAdmin ({navigation}) {

    const [userID,setuserID] = useState('');
    const [userFullname,setuserFullname] = useState('');
    const [userEmail,setuserEmail] = useState('');
    const [userDoB,setuserDoB] = useState('Select DOB');
    const [userPassword,setuserPassword] = useState('');
    const [userConfirmPassword,setuserConfirmPassword] = useState('');
    const [userRole,setuserRole] = useState(null);
    const [currentTime,setcurrentTime] = useState('');
    const [userExist, setuserExist] = useState();
    const [date, setDate] = useState(new Date())
    // const [text, setText] = useState();
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');


    const onChange = ( event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        // setText(fDate);
        setuserDoB(fDate);
        setShow(false);
        // console.log("hi "+userDoB);
    }

    const showMode = (cureentMode) => {
        setShow(true);
        setMode(cureentMode);
    }

    const getcurrentTime = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setcurrentTime(
          date + '/' + month + '/' + year 
          + ' ' + hours + ':' + min + ':' + sec
        );
    }

    useEffect(() => {
        getcurrentTime();
        //improvise for the moment on how to check email
        checkEmailExist(userEmail);
        console.log(userExist);
    },[userEmail]); 
    
    const checkEmailExist = async(inputUserEmail) => {
        var getUserbyEmailAPI = 'https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserEmail='+ inputUserEmail;
        
        fetch(getUserbyEmailAPI).then((response) => response.json()).then((json) => {
            // return true;
            if (json.length > 0){
                //exist
                returnTrue();
                
              }else{
                //does not exist
                returnFalse();
                
              } 
                 
        }).catch((error) => {
            console.error(error);
        });
    }
    const returnTrue = () =>{
        setuserExist(true);
    }
    const returnFalse = () =>{
        setuserExist(false);
    }

    const addNewAdmin = async () => {
        if (userPassword == userConfirmPassword){
            checkEmailExist(userEmail);
            // checkEmailExist(userEmail);
            // const exist = checkEmailExist(userEmail);
            
            if (userExist == false){
                if (userRole != null){
                    let res = await fetch("https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/users?NewUser=true", {
                            method: "POST",
                            body: JSON.stringify({
                                userID: 'uid' + uuid.v4(),
                                userEmail: userEmail,
                                userFullname: userFullname,
                                userPassword: userConfirmPassword,
                                userDoB: userDoB,
                                userRole: userRole,
                                createdTime: currentTime
                            }),
                        }).then((res) => {
                            if (res.status == 200) {
                                    alert("Added successfully.")
                                    console.log("Item created successfully");
                                    navigation.navigate('AdminManageAdminScreen')
                                } else {
                                    alert("Submission failed Error:" + res.status)
                                    console.log("Some error occured: ");
                                    console.log(res.status)
                                    console.log(res)
                                }
                        });
                }
                else {
                    alert("Select a role");
                }
            }
            else if (userExist == true){
                alert("Email has been taken.");

            }
        }
        else{
            alert("Password does not match.");
        }
        
    }
    
    
        
        
    

    return(
        <View style={styles.root}>

            <Text style={styles.title}>Add New Admin</Text>
            <Text style={styles.title2}>Insert Admin's Profile Information Here</Text>

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

            <View style={styles.sectionStyle}>
            <Ionicons name='lock-closed-outline' size={30} style={{paddingLeft:5, paddingRight:7}}/>

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Password Here"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    value={userPassword} onChangeText = {(val) => setuserPassword(val)}
                />
            </View>

            <View style={styles.sectionStyle}>
            <Ionicons name='lock-closed-outline' size={30} style={{paddingLeft:5, paddingRight:7}} />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Password Here Again"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    value={userConfirmPassword} onChangeText = {(val) => setuserConfirmPassword(val)}
                />
            </View>

            <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => addNewAdmin()}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Submit</Text>
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

    sectionStyle2: {
        backgroundColor: '#fff',
        borderWidth: 1,
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

export default AddNewAdmin;