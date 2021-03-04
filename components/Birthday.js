import React, { useEffect ,useState} from 'react';
import { View, Text, Button, StyleSheet,
  Image,
  FlatList,
  StatusBar, 
  TextInput,
  TouchableOpacity,
  Alert} from 'react-native';
import { useTheme } from '@react-navigation/native';
import  firebase from '../components/firebase'
import { connect } from 'react-redux';
import moment from 'moment';

const Birthday = ({setUserBday,birthdayState,userState}) =>{
  const [wish, setwish] = useState("")
  const [dateToday,setDateToday] = useState("")
  const [fdateToday,setfDateToday] = useState("")
  const [anyBdayToday,setAnyBdayToday] = useState(false)
  
  const handleChange = (val) => {
   setwish(val)
  }

  const postWish =(id)=>{
    firebase.firestore()
    .collection("wishes")
    .doc(fdateToday)
    .update(id, firebase.firestore.FieldValue.arrayUnion(
      {
        id:userState?.user?.id,
        name:userState?.user?.name,
        timestamp:firebase.firestore.Timestamp.now(),
        wish: wish
      }
    ))
    .catch(
      firebase.firestore()
      .collection("wishes")
      .doc(fdateToday)
      .set({
          [id]:firebase.firestore.FieldValue.arrayUnion({
          id:userState?.user?.id,
          name:userState?.user?.name,
          timestamp:firebase.firestore.Timestamp.now(),
          wish: wish
        })
      })
    )
  }

  function formattedDate(dateObj) {
    let dt 
    if (dateObj.getDate() < 10) {
      if (dateObj.getMonth() + 1 < 10)
      dt= ("0" +(dateObj.getMonth() + 1) + "_0" + dateObj.getDate())
      else
      dt= ((dateObj.getMonth() + 1) + "_0" + dateObj.getDate())
    } else {
      if (dateObj.getMonth() + 1 < 10)
      dt= ("0" +(dateObj.getMonth() + 1) + "_" + dateObj.getDate())
      else
      dt =((dateObj.getMonth() + 1) + "_" + dateObj.getDate())
    }
    setDateToday(dt)
    return dt
  }

  useEffect(() => {
    const dtObj = new Date(firebase.firestore.Timestamp.now().seconds * 1000)
    const dtObj2 = new Date((firebase.firestore.Timestamp.now().seconds * 1000)+(86400*12*1000))

    firebase.firestore()
    .collection("users")
    .where('birthDay','>=',formattedDate(dtObj))
    .where('birthDay','<=',formattedDate(dtObj2))
    .get()
    .then(querySnapshot => {
      let bday = []
      querySnapshot.forEach(documentSnapshot => {
        bday.push(documentSnapshot.data())

        if(documentSnapshot.data().birthDay == dateToday){
          setAnyBdayToday(true)
        }
      });
      setUserBday(bday,"BIRTHDAY")
    });

    const fullDateToday = dtObj.getFullYear()+"_"+formattedDate(dtObj)
    setfDateToday(fullDateToday)

    firebase.firestore()
    .collection("wishes")
    .doc(fullDateToday)
    .get().then((snapshot) => {
      if(snapshot.data() === undefined){
        Alert.alert("No wishes yet!", [ {text: 'Okay'} ]);
        return;
      }else{
        setUserBday(snapshot.data(),"BIRTHDAY_WISHES")
      }
    })     
  }, []);

  return (
    <View style={styles.container}>
      <Text  style={{fontWeight: "bold", fontSize:18, textAlign:"center"}}>{anyBdayToday?"Birthdays Today":"No Birthday Today"}</Text>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={birthdayState?.data}
        renderItem={({ item }) => (
          <>
          {item.birthDay == dateToday?
            <View  style={styles.containerList} >
            <Text style={styles.birthday_name}>{item.name}</Text>
            <br/>
            <Image
              style={styles.image}
              source={{ uri: item.image }}
            />
            <br/>

            {birthdayState?.wishes?
              birthdayState?.wishes[item.id] === undefined ? 
                  <Text>No Wishes Yet, Be the first one!</Text>
                  : 
                birthdayState?.wishes[item.id]?.map((bdi, index) => (
                  <Text > {bdi.name} - {bdi.wish}</Text>
                )):<></>
            }

            <TextInput
              style={{ height: 30, borderColor: 'gray', borderWidth: 1 , flex: 1, width:'80%'}}
              onChangeText={(val) => handleChange(val)}
              placeholder="Write your wish here.."
            />

            <TouchableOpacity activeOpacity={0.95} style={styles.button} 
                onPress={() => postWish(item.id)}>
              <Text style={styles.button_text}>Post Wish</Text>
            </TouchableOpacity>
          </View>:<></>
          }
         </>
        )}
      />

      <Text  style={{fontWeight: "bold", fontSize:18, textAlign:"center" ,elevation:4,shadowColor:"black"}}>Upcoming Birthdays</Text>
      <FlatList
          numColumns={1}
          horizontal={false}
          data={birthdayState?.data}
          renderItem={({ item }) => (
            <View  style={styles.containerList} >
              <br/>
              <Image
                style={styles.image}
                // source={{ uri: item.image }}
                source={require('../assets/pp.png')}
              />
              <br/>
              <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.birthday_name}>{item.name} on {item.birthDay}</Text>
              </View>
            </View>
        )}
      />
    </View>
  )
}

function mapStateToProps({ birthdayState,userState}) {
    return {
      birthdayState,
      userState
    };
}
  
function mapDispatchToProps(dispatch) {
  return {
      setUserBday: (data,type) => dispatch({
        type: type,
        data:data
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Birthday);

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      width:"100%",
    },
    container_wish: {
      height:200,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    containerList: {
      marginTop:15,
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
      marginLeft:5,
      borderColor: "grey"
    },
    birthday_name: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#05375a'
    },
    button: {
      flexDirection: 'row', 
      height: 25, 
      width:100,
      backgroundColor: '#05375a',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      elevation:3,
    },
    button_text: {
      fontSize: 16,
      fontWeight: 'bold',
      color :"white"
    }
});
  