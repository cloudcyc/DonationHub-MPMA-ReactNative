import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from "@react-native-picker/picker";
import { event } from 'react-native-reanimated';
import uuid from 'react-native-uuid';
import ImgToBase64 from 'react-native-image-base64';

function AdminAddLocation ({navigation}) {

    const [centreName,setcentreName] = useState('');
    const [centreDesc,setcentreDesc] = useState('');
    const [centreAddress,setcentreAddress] = useState('');
    const [centreLatitude,setcentreLatitude] = useState('');
    const [centreLongitude,setcentreLongitude] = useState('');
    const [currentTime,setcurrentTime] = useState('');
    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/401/401061.png');
    const [uploadImage, setuploadImage] = useState(null);
    const [centreStatus, setCentreStatus] = useState(null);
    
    
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            ImgToBase64.getBase64String(image.path)
                .then(base64String => 
                    setuploadImage(base64String)
                    )
                .catch(err => 
                    alert("Something wrong here. Error: " + err)
                    );
            setImage(image.path);
          });
    };

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
    },[]); 

    const [status, setStatus] = useState('Unknown');

    const addCentre = async () => {
        // console.log("\nThis is cid : cid" + uuid.v4());
        // console.log("\nThis is CentreName :" + centreName);
        // console.log("\nThis is centreDesc :" + centreDesc);
        // console.log("\nThis is centreAddress :" + centreAddress);
        // console.log("\nThis is centreLatitude :" + centreLatitude);
        // console.log("\nThis is centreLongitude :" + centreLongitude);
        // console.log("\nThis is currentTime :" + currentTime);
        // console.log("\nThis is uploadImage :" + uploadImage);
        // console.log("\nThis is centreStatus :" + centreStatus);
        if (centreStatus == null){
            alert("Please fill in every criteria. Note: check Image and Centre Status");
        }
        else 
        {
            let res = await fetch("https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/centres", {
                        method: "POST",
                        body: JSON.stringify({
                            centreID: 'cid' + uuid.v4(),
                            centreName: centreName,
                            centreAddress: centreAddress,
                            centreCoordinate: [ centreLatitude, centreLongitude ],
                            centreDescription: centreDesc,
                            centreStatus: centreStatus,
                            createdTime: currentTime,
                            centreImage: uploadImage
                        }),
                    }).then((res) => {
                        if (res.status == 200) {
                                alert("Centre added successfully.")
                                console.log("Item created successfully");
                                navigation.navigate('Admin')
                            } else {
                                alert("Submission failed Error:" + res.status)
                                console.log("Some error occured: ");
                                console.log(res.status)
                                console.log(res)
                            }
                    });
        }
        
    }

    return(
        <ScrollView style={styles.root}>

            <View>
                <Text style={styles.title2}>Centre Name:</Text>
                <View style={styles.sectionStyle}>
                    {/* <Image
                        source={{
                        uri:
                            'https://cdn-icons.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1652674651~hmac=c2ada6e2765279598bf08d0bcdee3d36',
                        }}
                        style={styles.imageStyle}
                    /> */}
                    <Ionicons name='business-outline' size={25} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Centre Name Here"
                        underlineColorAndroid="transparent"
                        value={centreName} onChangeText = {(val) => setcentreName(val)}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title2}>Centre Address:</Text>
                <View style={styles.sectionStyle}>
                    {/* <Image
                        source={{
                        uri:
                            'https://cdn-icons.flaticon.com/png/512/3293/premium/3293303.png?token=exp=1652674900~hmac=499ef48a9e78c075dc6754cf36c5dc02',
                        }}
                        style={styles.imageStyle}
                    /> */}
                    <Ionicons name='location-outline' size={25} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter The Centre Address"
                        underlineColorAndroid="transparent"
                        value={centreAddress} onChangeText = {(val) => setcentreAddress(val)}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title2}>Centre Coordinate</Text>
                <Text style={styles.title3}>Latitude:</Text>
                <View style={styles.sectionStyle}>
                    {/* <Image
                        source={{
                        uri:
                            'https://cdn-icons.flaticon.com/png/512/1151/premium/1151429.png?token=exp=1652674708~hmac=5c4f3b8bb218142273ab2cc455fd4169',
                        }}
                        style={styles.imageStyle}
                    /> */}
                    <Ionicons name='navigate-outline' size={25} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Latitude. Eg: 3.0554"
                        underlineColorAndroid="transparent"
                        keyboardType="phone-pad"
                        value={centreLatitude} onChangeText = {(val) => setcentreLatitude(val)}
                    />
                </View>
                <Text style={styles.title3}>Longitude:</Text>
                <View style={styles.sectionStyle}>
                    {/* <Image
                        source={{
                        uri:
                            'https://cdn-icons.flaticon.com/png/512/1151/premium/1151429.png?token=exp=1652674708~hmac=5c4f3b8bb218142273ab2cc455fd4169',
                        }}
                        style={styles.imageStyle}
                    /> */}
                    <Ionicons name='navigate-outline' size={25} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Longitude. Eg: 101.7006"
                        underlineColorAndroid="transparent"
                        keyboardType="phone-pad"
                        value={centreLongitude} onChangeText = {(val) => setcentreLongitude(val)}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title2}>Centre Description</Text>
                <View style={styles.sectionStyle}>
                    {/* <Image
                        source={{
                        uri:
                            'https://cdn-icons.flaticon.com/png/512/3293/premium/3293303.png?token=exp=1652674900~hmac=499ef48a9e78c075dc6754cf36c5dc02',
                        }}
                        style={styles.imageStyle}
                    /> */}
                    <Ionicons name='document-text-outline' size={25} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Centre Description"
                        underlineColorAndroid="transparent"
                        value={centreDesc} onChangeText = {(val) => setcentreDesc(val)}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title2}>Add Images:</Text>
                <View style={styles.sectionStyle4}>
                    <TouchableOpacity onPress={choosePhotoFromLibrary}>
                    <Image
                        source={{
                        uri:
                            image,
                        }}
                        style={styles.imageStyle2}
                    />
                    </TouchableOpacity>
                </View>
            </View>

            <View>

            <Text style={styles.title2}>Status:</Text>
            <Picker
                    selectedValue={centreStatus}
                    onValueChange={(value, index) => setCentreStatus(value)}
                    mode="dropdown" // Android only
                    style={styles.picker}>
                    

                    <Picker.Item label="Select location status" value= {null} />
                    <Picker.Item label="Active" value="Active" />
                    <Picker.Item label="Inactive" value="Inactive" />

                </Picker>

            </View>


            <View style={[styles.bottomView]}>

                <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => addCentre()}
                    // onPress={() => navigation.navigate('HomeTabs')}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>

            </View>
                
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    root:{
        backgroundColor: 'white',
        height:'120%',
        padding:20,
        paddingTop:0,
    },

    container:{
        backgroundColor: '#E9ECEF',
        borderRadius: 40,
        height: '100%',
    },

    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2a9d8f',
    },

    description:{
        paddingTop:10,
        fontSize: 15,
        color: 'gray',
    },

    title2:{
        paddingTop: 25,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fb5607',
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
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 100,
        borderRadius: 5,
        marginTop: 10,
        marginBottom:10,
    },

    sectionStyle3: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 100,
        borderRadius: 5,
        marginTop: 10,
        marginBottom:10,
    },

    sectionStyle4: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 150,
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

    imageStyle2: {
        padding: 10,
        margin: 5,
        height: 120,
        width: 120,
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight:10,
        alignContent:'center',
    },

    textInputStyle: {
        flex: 1
    },

    textInputStyle2: {
        flex: 1,
        textAlign:'center',
    },

    button:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#90e0ef',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        height:45,
        alignSelf:'flex-end',
        width:'40%'
    },

    button2:{
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#4166f5',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        height:45,
        alignSelf:'flex-end',
        width:'40%',
    },

    submitText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
    },

    row:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom:10
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
        marginBottom:50
      },

    loginText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
    },

    picker: {
        marginVertical: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
      },

})

export default AdminAddLocation;