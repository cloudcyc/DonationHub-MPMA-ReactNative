import React,{useState} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from "@react-native-picker/picker";
import { event } from 'react-native-reanimated';
import { useRoute } from "@react-navigation/native";
import ImgToBase64 from 'react-native-image-base64';
function AdminEditLocation ({navigation}) {
    const route = useRoute();

    const [centreID,setcentreID] = useState(route.params.centreID);
    const [centreName,setcentreName] = useState(route.params.centreName);
    const [centreDesc,setcentreDesc] = useState(route.params.centreDescription);
    const [centreAddress,setcentreAddress] = useState(route.params.centreAddress);
    const [centreLatitude,setcentreLatitude] = useState(route.params.centreCoordinate[1]);
    const [centreLongitude,setcentreLongitude] = useState(route.params.centreCoordinate[0]);
    const [createdTime,setcreatedTime] = useState(route.params.createdTime);
    const [currentCentreStatus, setCurrentCentreStatus] = useState(route.params.centreStatus);
    const [NewCentreStatus, setNewCentreStatus] = useState(null);
    const [image, setImage] = useState('https://nics3test8860.s3.ap-southeast-1.amazonaws.com/DonationCentreAsset/'+[route.params.centreID]+'.jpg');
    const [uploadImage, setuploadImage] = useState(null);
    var postUpdateCentreAPI = 'https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/centres?';
    
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


    const updateCentre = async () => {
        //inputCurrentCentreStatus=Inactive& inputNewCentreStatus=Active& inputCentreID=cid0003
        if (currentCentreStatus == NewCentreStatus || NewCentreStatus == null)
        {
            postUpdateCentreAPI = postUpdateCentreAPI+'inputCurrentCentreStatus='+currentCentreStatus+'&inputCentreID='+centreID;
            //Status Never changed
            if (uploadImage != null){
                //New Image
                postUpdateCentreAPI = postUpdateCentreAPI+'&NewImage=True';
                var data = {
                    centreID: centreID,
                    centreName: centreName,
                    centreAddress: centreAddress,
                    centreCoordinate: [ centreLatitude, centreLongitude ],
                    centreDescription: centreDesc,
                    centreStatus: currentCentreStatus,
                    createdTime: createdTime,
                    centreImage: uploadImage
                }
                console.log(postUpdateCentreAPI);
            }else{
                //No New Image
                console.log(postUpdateCentreAPI);
                var data = {
                    centreID: centreID,
                    centreName: centreName,
                    centreAddress: centreAddress,
                    centreCoordinate: [ centreLatitude, centreLongitude ],
                    centreDescription: centreDesc,
                    centreStatus: currentCentreStatus,
                    createdTime: createdTime
                }
                console.log(data);
            }
        }
        else if (currentCentreStatus != NewCentreStatus || NewCentreStatus != null){
            //Status changed
            postUpdateCentreAPI = postUpdateCentreAPI+'inputCurrentCentreStatus='+currentCentreStatus+'&inputNewCentreStatus=' + NewCentreStatus +'&inputCentreID='+centreID;
            if (uploadImage != null){
                //New Image
                postUpdateCentreAPI = postUpdateCentreAPI+'&NewImage=True';
                var data = {
                    centreID: centreID,
                    centreName: centreName,
                    centreAddress: centreAddress,
                    centreCoordinate: [ centreLatitude, centreLongitude ],
                    centreDescription: centreDesc,
                    centreStatus: NewCentreStatus,
                    createdTime: createdTime,
                    centreImage: uploadImage
                }
            }else{
                //No New Image
                var data = {
                    centreID: centreID,
                    centreName: centreName,
                    centreAddress: centreAddress,
                    centreCoordinate: [ centreLatitude, centreLongitude ],
                    centreDescription: centreDesc,
                    centreStatus: NewCentreStatus,
                    createdTime: createdTime
                }
            }
        }
        let res = await fetch(postUpdateCentreAPI, {
            method: "POST",
            body: JSON.stringify(data),
          }).then((res) => {
            if (res.status == 200) {
                    alert("Centre updated successfully.")
                    console.log("Item created successfully");
                    navigation.navigate('Admin')
                  } else {
                    alert("Centre update failed. Error:" + res.status)
                    console.log("Some error occured: ");
                    console.log(res.status)
                    console.log(res)
                  }
          });
    }
    


    return(
        <ScrollView style={styles.root}>

            <View>
                <Text style={styles.title2}>Centre Name:</Text>
                <View style={styles.sectionStyle}>
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
                    <Ionicons name='location-outline' size={25} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter The Centre Address"
                        underlineColorAndroid="transparent"
                        value= {centreAddress}
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
                        value= {centreLatitude}
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
                        value= {centreLongitude}
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
                        value= {centreDesc}
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

            <Text style={styles.title2}>Current Status: {currentCentreStatus}</Text>
                <Picker
                    selectedValue={NewCentreStatus}
                    onValueChange={(value, index) => setNewCentreStatus(value)}
                    mode="dropdown" // Android only
                    style={styles.picker}>
                    

                    <Picker.Item label="Select location status to update" value= {null} />
                    <Picker.Item label="Active" value="Active" />
                    <Picker.Item label="Inactive" value="Inactive" />

                </Picker>

            </View>


            <View style={[styles.bottomView]}>

                <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => updateCentre()}
                    // onPress={() => navigation.navigate('Admin')}
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

export default AdminEditLocation;