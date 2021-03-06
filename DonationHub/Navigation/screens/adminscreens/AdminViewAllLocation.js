import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable, FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

function AdminViewAllLocationScreen ({navigation}) {
    const isFocused = useIsFocused(); //used to refresh upon entering new screen
    const [centreList, setcentreList] = React.useState([]);
    const [search, setNewSearch] = React.useState("");
    const getActiveCentreAPI = 'https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/centres';
    const getCentreList = () => {
        fetch(getActiveCentreAPI).then((response) => response.json()).then((json) => { 
            setcentreList(json);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleSearchChange = (text) => {
        setNewSearch(text)
        
      };
    const filteredCentre = !search
    ? centreList
    : centreList.filter((filterCentre) =>
        filterCentre.centreAddress.toLowerCase().includes(search.toLowerCase())
      );

    React.useEffect(() => {
        if(isFocused){ 
            getCentreList();
        }
        
        
    },[navigation, isFocused]);
    return(

        <View style={styles.root}>

            
            <View style={styles.containerSearch}>
                <TextInput placeholder='Search Area'
                     onChangeText ={(text) => handleSearchChange(text)}
                />
            </View>
            <FlatList 
                        data={filteredCentre}
                        keyExtractor= {(key) => {
                            return key.centreID;
                        }}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator}/>
                            )
                        }}
                        renderItem={({item}) => {
                            return (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate( 'AdminLocationDetails', item)}
                                        style={styles.roundButton}>
                                        <Image style={styles.icon} source={{
                                            uri:'https://nics3test8860.s3.ap-southeast-1.amazonaws.com/DonationCentreAsset/'+[item.centreID]+'.jpg',
                                        }}/>
                                        <Text style={styles.locationtitle}>{item.centreName}</Text>
                                        {/* <Text style={styles.locationtitle2}>Phone:      03-2118 8833</Text> */}
                                        <Text style={styles.locationtitle2}>Location:  {item.centreAddress}</Text>
                                        <Text style={styles.locationtitle2}>Status:  {item.centreStatus}</Text>
                                    </TouchableOpacity>
                                )
                        }}
            >
            </FlatList> 
            <TouchableOpacity
                onPress={() => navigation.navigate('AdminAddLocation')}
                style={styles.roundButton1}>
                <Text style={styles.addtext}>+</Text>
            </TouchableOpacity> 
        
        </View>

        
    )
};

const styles = StyleSheet.create({

    root:{
        padding:20,
        height:'100%',
    },

    roundButton: {
        width: '100%',
        height: 270,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
    },

    icon: {
        width:'100%',
        height:150,
        borderRadius:5,
        paddingBottom:5,
    },

    locationtitle: {
        fontWeight:'500',
        padding:5,
        paddingTop: 8,
        fontSize:18
    },

    locationtitle2: {
        fontWeight:'500',
        padding:5,
        paddingTop: 5,
        color:'grey'
    },

    containerSearch:{
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
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



export default AdminViewAllLocationScreen;