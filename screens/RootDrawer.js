import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from '../components/DrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';

import EmployeeDirectory from './EmployeeDirectory';
import HopMessage from './HopMessage';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Circulars from './Circulars';
import WebLinks from './WebLinks';

const Drawer = createDrawerNavigator();

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const HopStack = createStackNavigator();
const PiDataStack = createStackNavigator();
const CircularStack = createStackNavigator();
const WebLinksStack = createStackNavigator();

const RootDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
        <Drawer.Screen name="EmployeeDirectory" component={DetailsStackScreen} />
        <Drawer.Screen name="Profile" component={PiDataStackScreen} />
        <Drawer.Screen name="HopMessage" component={HopStackScreen} />
        <Drawer.Screen name="Circulars" component={CircularStackScreen} />
        <Drawer.Screen name="WebLinks" component={WebLinksStackScreen} />

        {/*<Drawer.Screen name="SettingsScreen" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
}

export default RootDrawer;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
          headerStyle: {backgroundColor: '#009387',},
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
      title:'Overview',
      headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
      }} />
  </HomeStack.Navigator>
  );

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator screenOptions={{
          headerStyle: {backgroundColor: '#009387',},
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
      <DetailsStack.Screen name="Employee Directory / IMP Contacts" component={EmployeeDirectory} options={{
      headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
      }} />
    </DetailsStack.Navigator>
  );

const HopStackScreen = ({navigation}) => (
  <HopStack.Navigator screenOptions={{
          headerStyle: {backgroundColor: '#009387',},
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
      <HopStack.Screen name="Head of Project" component={HopMessage} options={{
      headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
      }} />
    </HopStack.Navigator>
  );

const PiDataStackScreen = ({navigation}) => (
  <PiDataStack.Navigator screenOptions={{
          headerStyle: {backgroundColor: '#009387',},
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
      <PiDataStack.Screen name="Pi Data" component={ProfileScreen} options={{
      headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
      }} />
    </PiDataStack.Navigator>
  );

const CircularStackScreen = ({navigation}) => (
  <CircularStack.Navigator screenOptions={{
          headerStyle: {backgroundColor: '#009387',},
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
      <CircularStack.Screen name="Circulars / Notice" component={Circulars} options={{
      headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
      }} />
    </CircularStack.Navigator>
  );

const WebLinksStackScreen = ({navigation}) => (
  <WebLinksStack.Navigator screenOptions={{
          headerStyle: {backgroundColor: '#009387',},
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
    <WebLinksStack.Screen name="Web Links" component={WebLinks} options={{
      headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </WebLinksStack.Navigator>
  );