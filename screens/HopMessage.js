import React ,{useEffect}from 'react';
import { View,
  Text,Image,
   Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import  firebase from '../components/firebase'
import {
  Avatar,
} from 'react-native-paper';


const HopMessage = ({navigation,hopState,setHopMessage}) => {
  useEffect(() => {
    firebase.firestore()
    .doc("hop/hop")
    .get()
    .then(snapshot => {
      setHopMessage(snapshot.data())
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={ {uri: hopState?.hop?.profile}}
        style = {{ width: 250, height: 250 }}
      />
      <Text style = {{ fontSize: 20  }}>PRADIP KUMAR MISHRA</Text>
      <Text style = {{ fontSize: 20, fontWeight:600 }}>Head of Project</Text>
      <Text style = {{ textAlign: "center", marginTop:4,padding:16 }}>"{hopState?.hop?.message}"</Text>
    </View>
  );
};

function mapStateToProps({ hopState}) {
  return {
    hopState
  };
}

function mapDispatchToProps(dispatch) {
  return {
      setHopMessage: (data) => dispatch({
        type: "HOP_MESSAGE",
        data:data   
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HopMessage);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },
});
