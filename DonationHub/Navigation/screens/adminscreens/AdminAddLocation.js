import React,{useState} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { event } from 'react-native-reanimated';

function AdminAddLocation ({navigation}) {

    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/401/401061.png');

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            setImage(image.path);
          });
    };

    return(
        <ScrollView style={styles.root}>

            <View>
                <Text style={styles.title2}>Location Name:</Text>
                <View style={styles.sectionStyle}>
                    <Image
                        source={{
                        uri:
                            'https://cdn-icons.flaticon.com/png/128/2838/premium/2838912.png?token=exp=1652467613~hmac=6aeae007c91532f18dc3c304df0d28e8',
                        }}
                        style={styles.imageStyle}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Location Name Here"
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title2}>Phone Number:</Text>
                <View style={styles.sectionStyle}>
                    <Image
                        source={{
                        uri:
                            'https://cdn-icons-png.flaticon.com/128/159/159832.png',
                        }}
                        style={styles.imageStyle}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Contact Number Here"
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title2}>Address:</Text>
                <View style={styles.sectionStyle2}>
                    <Image
                        source={{
                        uri:
                            'https://cdn-icons.flaticon.com/png/128/3095/premium/3095581.png?token=exp=1652467660~hmac=d9791af8d7ed3de4f52c928e09de1559',
                        }}
                        style={styles.imageStyle}
                    />
                    <TextInput
                        multiline={true}
                        style={styles.textInputStyle}
                        placeholder="Enter Address Here"
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title2}>Open Hours:</Text>
                <View style={styles.sectionStyle2}>
                    <Image
                        source={{
                        uri:
                            'https://cdn-icons-png.flaticon.com/128/694/694572.png',
                        }}
                        style={styles.imageStyle}
                    />
                    <TextInput
                        multiline={true}
                        style={styles.textInputStyle}
                        placeholder="Enter Opening Hours Of The Location Here"
                        underlineColorAndroid="transparent"
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

                <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => navigation.navigate('Admin')}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
                
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

})

export default AdminAddLocation;