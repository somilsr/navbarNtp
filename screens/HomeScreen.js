import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import Birthday from '../components/Birthday'
import AsyncStorage from '@react-native-community/async-storage';
import  firebase from '../components/firebase'

const HomeScreen = ({navigation,setUserState}) => {
  const getUserId = async () => {
    let userId = '';
    try {
      userId = await AsyncStorage.getItem('userId') ;
      if(userId != null){
        firebase.firestore()
          .collection("users")
          .doc(userId)
          .get().then((snapshot) => {
            if(snapshot.data() === undefined){
            }else{
              setUserState(snapshot.data())
            }
          }) 
      }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserId()
  }, []);

  return (
    <View style={styles.container}>

    <Birthday/>

    {/* <Button
      title="Go to details screen"
      onPress={() => navigation.navigate("Details")} /> 
    */}
    </View>
  );
};

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserState: (data) => dispatch({
      type: "USER_STATE",
      data:data
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
