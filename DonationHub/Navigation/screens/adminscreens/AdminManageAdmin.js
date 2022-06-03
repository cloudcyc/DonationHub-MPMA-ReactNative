import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View,TouchableHighlight, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
Ionicons.loadFont();

function AdminManageAdminScreen ({navigation}) {
  const isFocused = useIsFocused(); //used to refresh upon entering new screen
  const route = useRoute();
  console.log("this "+route.params.userID);
  const [adminList, setadminList] = useState([]);
  

  const getAdminsFunction = async() => {
    var getOtherAdminsAPI = 'https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/users?inputUserRole=Admin&inputUserID='+ route.params.userID;
    console.log(getOtherAdminsAPI);
    fetch(getOtherAdminsAPI).then((response) => response.json()).then((json) => {
      setadminList(json);
    }).catch((error) => {
      console.error(error);
    });

  };

  

  useEffect(() => {
    getAdminsFunction();
  }, [navigation, isFocused]);

    return(
        <View style={styles.root}>
        
        <FlatList 
                        data={adminList}
                        keyExtractor= {(key) => {
                            return key.userID;
                        }}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator}/>
                            )
                        }}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.box}>
                                  <Image style={styles.image} source={{uri: "https://bootdey.com/img/Content/avatar/avatar1.png"}} />
                                  <View style={styles.boxContent}>
                                    <Text style={styles.title}>{item.userFullname}</Text>
                                    <Text style={styles.description}>{item.userEmail}</Text>
                                    <Text style={styles.description}>{item.userRole}</Text>
                                    <View style={styles.buttons}>
                                      <TouchableOpacity style={[styles.button, styles.view]} onPress={() => navigation.navigate('AdminManageAdminProfile',item)}>
                                        <Ionicons name='create-outline' size={25} />
                                      </TouchableOpacity>

                                      <TouchableOpacity style={[styles.button, styles.profile]}>
                                          <Ionicons name='trash-outline' size={25} style={{color:'white'}} />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </View>
                                )
                        }}
            >
            </FlatList> 
            {/* <ScrollView style={styles.root}>
                <View style={styles.box}>
                    <Image style={styles.image} source={{uri: "https://bootdey.com/img/Content/avatar/avatar1.png"}} />
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>Holland Team</Text>
                        <Text style={styles.description}>CEO</Text>
                        <View style={styles.buttons}>
                            
                            <TouchableOpacity style={[styles.button, styles.view]} onPress={() => navigation.navigate('AdminManageAdminProfile')}>
                                <Ionicons name='create-outline' size={25} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.profile]}>
                                <Ionicons name='trash-outline' size={25} style={{color:'white'}} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                
            </ScrollView> */}

            <TouchableOpacity
                onPress={() => navigation.navigate('AddNewAdmin')}
                style={styles.roundButton1}>
                <Text style={styles.addtext}>+</Text>
            </TouchableOpacity> 

            
      </View>

      
    )
}

const styles = StyleSheet.create({

    root:{
        height:'100%'
    },

    image: {
        width: 100,
        height:100,
      },
      box: {
        padding:20,
        marginTop:5,
        backgroundColor: 'white',
        flexDirection: 'row',

      },
      boxContent: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft:10,
      },
      title:{
        fontSize:18,
        color:"#151515",
      },
      description:{
        fontSize:15,
        color: "#646464",
      },
      buttons:{
        flexDirection: 'row',
      },
      button: {
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        width:50,
        marginRight:5,
        marginTop:5,
      },
      icon:{
        width:20,
        height:20,
      },
      view: {
        backgroundColor: "#eee",
      },
      profile: {
        backgroundColor: "#1E90FF",
      },
      message: {
        backgroundColor: "#228B22",
      },
      roundButton1: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#FF9100',
        position:'absolute',
        alignSelf:'flex-end',
        bottom:20,
        right:20,
    },

    addtext:{
        color:'white',
        fontSize:30
    }

});

export default AdminManageAdminScreen;