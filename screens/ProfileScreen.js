import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import  firebase from '../components/firebase'
import moment from 'moment'

const ProfileScreen = ({piState,getPiData}) => {
  useEffect(() => {
    firebase.firestore()
    .doc("pi/data")
    .get()
    .then(snapshot => {
      getPiData(snapshot.data())
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style = {{ fontSize: 20, fontWeight:800 }} >Generation Data{"\n\n"}</Text>
      {piState?.pi?
      <>
        <Text style = {{ fontSize: 18, fontWeight:600 }} >Unit 1 </Text>
        <Text>Date : {moment(piState.pi.timestamp_1).format("DD MMM YYYY hh:mm a") }{"\n"}</Text>
        <Text>Load : {piState.pi.load_1} MW{"\n"}</Text>
        <Text>MS Presure : {piState.pi.ms_pressure_1} KSC{"\n"}</Text>
        <Text>MS Temperature : {piState.pi.ms_temperature_1} DegC{"\n"}</Text>
        <Text>MS Temperature : {piState.pi.hrh_temperature_1} DegC{"\n"}{"\n"}{"\n"}</Text>

        <Text style = {{ fontSize: 18, fontWeight:600 }} >Unit 2 </Text>
        <Text>Date : {moment(piState.pi.timestamp_2).format("DD MMM YYYY hh:mm a") }{"\n"}</Text>
        <Text>Load : {piState.pi.load_2} MW{"\n"}</Text>
        <Text>MS Presure : {piState.pi.ms_pressure_2} KSC{"\n"}</Text>
        <Text>MS Temperature : {piState.pi.ms_temperature_2} DegC{"\n"}</Text>
        <Text>MS Temperature : {piState.pi.hrh_temperature_2} DegC{"\n"}</Text>
      </>:
        <Text>Loading...</Text>
    }
    </View>
  );
};

function mapStateToProps({ piState}) {
  return {
    piState
  };
}

function mapDispatchToProps(dispatch) {
  return {
      getPiData: (data) => dispatch({
        type: "PI_STATE",
        data:data   
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
