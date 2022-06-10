import React,{useState, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from './screens/adminscreens/Loginscreen';
import HomeScreen from './screens/Homescreen';
import LocationDetails from './screens/LocationDetails';
import ProfileScreen from './screens/Profile';
import RequestScreen from './screens/adminscreens/Requestscreen';
import RequestDetailScreen from './screens/adminscreens/RequestDetailScreen';
import AddNewRequest from './screens/AddNewRequest';
import AdminHomeScreen from './screens/adminscreens/AdminHomescreen';
import AdminAddLocation from './screens/adminscreens/AdminAddLocation';
import AdminSettingScreen from './screens/adminscreens/AdminSettingScreen';
import AdminEditLocation from './screens/adminscreens/AdminEditLocation';
import AdminLocationDetails from './screens/adminscreens/AdminLocationDetails';
import AdminViewAllLocationScreen from './screens/adminscreens/AdminViewAllLocation';
import AdminEditProfileScreen from './screens/adminscreens/AdminEditProfile';
import AdminManageAdminScreen from './screens/adminscreens/AdminManageAdmin';
import AdminManageAdminProfile from './screens/adminscreens/AdminManageAdminProfile';
import AddNewAdmin from './screens/adminscreens/AddNewAdmin';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


// Screen name for tabs
const HomeScreenName = 'Our Locations';
const RequestScreenName = 'Requests' ;
const ProfileScreenName = 'Settings';

function HomeTabs() {
  const [userLogin, setuserLogin] = useState(true);
    return (
      <Tab.Navigator
      screenOptions={({route}) => ({
               tabBarInactiveTintColor: "grey",
               tabBarActiveTintColor: "#FF9100",
               tabBarIcon: ({focused, color, size}) =>{
                   let iconName;
                   let rn = route.name;

                   if (rn === HomeScreenName){
                        iconName = focused ? 'home' : 'home-outline'
                   } else if (rn === ProfileScreenName){
                        iconName = focused ? 'settings' : 'settings-outline'
                   } 

                   return <Ionicons name = {iconName} size = {size} color = {color}></Ionicons>

               }
           })}

            >

        <Tab.Screen name={HomeScreenName} component={HomeScreen} options={{headerShown: false,}}/>
        {/* {
          userLogin == true ? 
          <Tab.Screen name={RequestScreenName} component={RequestScreen} options={{headerShown: false,}}/>
          : 
          <Tab.Screen name={ProfileScreenName} component={ProfileScreen} options={{headerShown: false,}}/> 
        } */}
        <Tab.Screen name={ProfileScreenName} component={ProfileScreen} options={{headerShown: false,}}/> 
        
        
      </Tab.Navigator>
    );
  }

  function Admin() {
    return (
      <Tab.Navigator
      screenOptions={({route}) => ({
               tabBarInactiveTintColor: "grey",
               tabBarActiveTintColor: "#FF9100",
               tabBarIcon: ({focused, color, size}) =>{
                   let iconName;
                   let rn = route.name;

                   if (rn === HomeScreenName){
                        iconName = focused ? 'home' : 'home-outline'
                   } else if (rn === ProfileScreenName){
                        iconName = focused ? 'settings' : 'settings-outline'
                   } else if (rn === RequestScreenName){
                    iconName = focused ? 'newspaper' : 'newspaper-outline'
               }

                   return <Ionicons name = {iconName} size = {size} color = {color}></Ionicons>

               }
           })}

            >

        <Tab.Screen name={HomeScreenName} component={AdminHomeScreen} options={{headerShown: false,}}/>
        <Tab.Screen name={RequestScreenName} component={RequestScreen} options={{headerShown: true}}/>
        <Tab.Screen name={ProfileScreenName} component={AdminSettingScreen} options={{headerShown: false,}}/>
        
      </Tab.Navigator>
    );
  }
  
  export default function Maincontainer() {
    return (
      <Stack.Navigator>
        <Stack.Screen name = "HomeTabs" component={HomeTabs} options={{headerShown: false,}}/> 
        <Stack.Screen name = "LoginScreen" component={LoginScreen} options={{title: '',headerTintColor:'black'}}/>
        <Stack.Screen name = "HomeScreen" component={HomeScreen} options={{title: '',headerTintColor:'black'}}/> 
        <Stack.Screen name = 'LocationDetails' component = {LocationDetails} options={{title: '',headerTintColor:'black'}} /> 
        <Stack.Screen name = 'RequestScreen' component = {RequestScreen} options={{title: '',headerTintColor:'black'}} />
        <Stack.Screen name = 'RequestDetailScreen' component = {RequestDetailScreen} options={{title: '',headerTintColor:'black'}} />
        <Stack.Screen name = 'AddNewRequest' component = {AddNewRequest} options={{title: '',headerTintColor:'black'}} />
        <Stack.Screen name = 'Admin' component = {Admin} options={{headerShown: false,}} /> 
        <Stack.Screen name = 'AdminAddLocation' component = {AdminAddLocation} options={{title: '',headerTintColor:'black'}} />
        <Stack.Screen name = 'AdminEditLocation' component = {AdminEditLocation} options={{title: '',headerTintColor:'black'}} /> 
        <Stack.Screen name = 'AdminLocationDetails' component = {AdminLocationDetails} options={{title: '',headerTintColor:'black'}} /> 
        <Stack.Screen name = 'AdminViewAllLocationScreen' component = {AdminViewAllLocationScreen} options={{title: '',headerTintColor:'black'}} />
        <Stack.Screen name = 'AdminEditProfileScreen' component = {AdminEditProfileScreen} options={{title: '',headerTintColor:'black'}} /> 
        <Stack.Screen name = 'AdminManageAdminScreen' component = {AdminManageAdminScreen} options={{title: '',headerTintColor:'black'}} />
        <Stack.Screen name = 'AdminManageAdminProfile' component = {AdminManageAdminProfile} options={{title: '',headerTintColor:'black'}} />
        <Stack.Screen name = 'AddNewAdmin' component = {AddNewAdmin} options={{title: '',headerTintColor:'black'}} />   
   
      </Stack.Navigator>
      
    );
  }