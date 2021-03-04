import React, { useEffect ,useState} from 'react';
import { View, Text, StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button} from 'react-native';
import  firebase from '../components/firebase'
import { connect } from 'react-redux';

const Circulars = ({navigation,setEmployeeDirectory,circularState}) =>{
  const [tab,selectedTab] = useState("circulars")

  const dept = {
    59	:"AHP",
    1	:"ASH HANDLING",
    42	:"ASH MANAGEMENT",
    2	:"BMD",
    3	:"BUSINESS EXCELLENCE",
    4	:"C & I ERECT",
    5	:"C & I MAINT",
    6	:"C&M",
    7	:"C&M-CONTRACTS",
    8	:"C&M-MATERIALS",
    9	:"C&M-PURCHASE",
    10	:"C&M-STORES",
    11	:"CHEMISTRY",
    12	:"CHP",
    1006	:"CIVIL",
    13	:"CIVIL CONST",
    14	:"COMMS & TEST.",
    15	:"EEMG",
    16	:"ELECT ERECT",
    17	:"ELECT MAINT",
    18	:"ENVT. MGT.",
    1003	:"EWA",
    19	:"FINANCE",
    20	:"FLD. ENGG.",
    21	:"FQA",
    61	:"FQA/TS",
    22	:"FUEL HAND.",
    23	:"FUEL MANAGMENT",
    57	:"Gadarwara Executive Association",
    1005	:"GwSTPP Sports Council",
    24	:"HEAD OF PROJECT",
    25	:"HOP SECT",
    26	:"HR",
    27	:"HR-EDC",
    1004	:"Infinity Club",
    28	:"IT",
    29	:"MAINT. PLNG.",
    60	:"Maintinance",
    30	:"MECH ERECT",
    31	:"MECH MAINT",
    32	:"MECH MAINT- OFF SITE",
    33	:"MECH MAINT- WORKSHOP/AUTOBASE",
    55	:"Mechanical Maintenance",
    34	:"MEDICAL",
    35	:"MGR",
    56	:"MTP",
    36	:"O & M",
    1008:"O & M Civil",
    1007:"O&M Civil",
    37	:"OPERATION",
    38	:"OPERATION (MAIN PLANT)",
    39	:"P & S",
    40	:"PLANT CIVIL MAINT.",
    41	:"PROJ CONST",
    43	:"R & R",
    58	:"Railway Siding",
    44	:"SAFETY",
    45	:"SIM. TRG",
    46	:"T/S ADMN",
    47	:"T/S CIVIL MAINT",
    48	:"T/S ELECT MAINT",
    49	:"TECH SERVICES",
    50	:"TMD",
    51	:"VIGILANCE"}

  useEffect(() => {
    firebase.firestore()
    .collection('circulars')
    .get()
    .then(querySnapshot => {
      let c =[]
      querySnapshot.forEach((doc) => {
        c.push(doc.data())
        console.log(doc.data())
      });
      setEmployeeDirectory("CIRCULARS",c)
    });   

    firebase.firestore()
    .collection('notices')
    .get()
    .then(querySnapshot => {
      let c =[]
      querySnapshot.forEach((doc) => {
        c.push(doc.data())
      });
      setEmployeeDirectory("NOTICES",c)
    });   
     
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.buttonStyle}>
        <View style={[{width:"50%",padding:2}]}>
          <Button
              title="Circulars"
              color= {tab=="circulars"?"darkblue": "lightgray"}
              onPress={()=>selectedTab("circulars")}
          >
          </Button>
        </View> 
        <View style={[{width:"50%",padding:2}]}>
          <Button
                title="Notice"
                color=  {tab!="circulars"?"darkblue": "lightgray"}
                onPress={()=>selectedTab("notice")}
            />
        </View> 
      </View> 

      {tab=="circulars"?
        <FlatList
          numColumns={1}
          horizontal={false}
          data={circularState.circulars}
          renderItem={({ item}) => (
            <View style={styles.containerList} >
              <Text style={styles.birthday_name}>{item.TitleEnglish}</Text>
              <Text >Posted By - {dept[item?.DeptID]} on {item?.PostedOn}</Text>
            </View>
          )}
        />:
        <FlatList
          numColumns={1}
          horizontal={false}
          data={circularState.notices}
          renderItem={({ item}) => (
            <View style={styles.containerList} >
              <Text style={styles.birthday_name2}>{item?.Notice}</Text>
              <Text >Created On -  {item?.CreatedOn}</Text>
            </View>
          )}
      />
      }
    </View>
  )
}

function mapStateToProps({ circularState}) {
    return {
      circularState
    };
}
  
function mapDispatchToProps(dispatch) {
  return {
    setEmployeeDirectory: (type,data) => dispatch({
        type: type,
        data:data
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Circulars);

const styles = StyleSheet.create({
    container: {
      width:"100%",
    },
    container_wish: {
      height:200,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    containerList: {
      marginTop:10,
      marginBottom:5,
      marginLeft:10,
      marginRight:10,
      padding:4,
      flex:1,
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2},
      shadowRadius: 10,
      elevation: 3,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      overflow: "hidden",
      borderWidth: 3,
      borderColor: "grey"
    },
    birthday_name: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#05375a'
    },
    birthday_name2: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#e75480'
    },
    button: {
      flexDirection: 'row', 
      height: 30, 
      width:100,
      backgroundColor: '#05375a',
      alignItems: 'center',
      justifyContent: 'center',
      elevation:3,
    },
    button_text: {
      fontSize: 16,
      fontWeight: 'bold',
      color :"white"
    },
    buttonStyle: {
      flexDirection:'row',
      width:'100'
    },
    buttonTab: {
      height: 30, 
      backgroundColor: '#05375a',
      alignItems: 'center',
      justifyContent: 'center',
      elevation:3,
    },
});
