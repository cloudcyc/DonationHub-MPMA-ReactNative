import React,{useState} from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { event } from 'react-native-reanimated';

function AddNewRequest ({navigation}) {

    return(
        <View style={styles.root}>
            
            <Text style={styles.title}>A Location Missing?</Text>
            <Text style={styles.description}>Feel free to let us know about location details</Text>

            <View>
                <Text style={styles.title2}>Name:</Text>
                <View style={styles.sectionStyle}>
                    <Image
                        source={{
                        uri:
                            'https://cdn-icons.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1652674651~hmac=c2ada6e2765279598bf08d0bcdee3d36',
                        }}
                        style={styles.imageStyle}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Your Name Here"
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
                            'https://cdn-icons.flaticon.com/png/512/1151/premium/1151429.png?token=exp=1652674708~hmac=5c4f3b8bb218142273ab2cc455fd4169',
                        }}
                        style={styles.imageStyle}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Your Contact Number Here"
                        underlineColorAndroid="transparent"
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title2}>Name of Location:</Text>
                <View style={styles.sectionStyle}>
                    <Image
                        source={{
                        uri:
                            'https://cdn-icons.flaticon.com/png/512/3293/premium/3293303.png?token=exp=1652674900~hmac=499ef48a9e78c075dc6754cf36c5dc02',
                        }}
                        style={styles.imageStyle}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter The Missing Location's Name"
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>

            <View style={[styles.bottomView]}>

                <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => navigation.navigate('HomeScreen')}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>

            </View>
                
        </View>
    )
}

const styles = StyleSheet.create({

    root:{
        backgroundColor: 'white',
        height:'100%',
        padding:20
    },

    container:{
        backgroundColor: '#E9ECEF',
        borderRadius: 40,
        height: '100%',
    },

    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffb600',
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
        height: 50,
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

    bottomView:{
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width:'100%',
        marginLeft:20
    },

})

export default AddNewRequest;