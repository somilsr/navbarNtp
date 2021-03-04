import React, { useEffect ,useState} from 'react';
import { View, Text, StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button} from 'react-native';
import  firebase from '../components/firebase'
import { connect } from 'react-redux';

const EmployeeDirectory = ({navigation,setEmployeeDirectory,employeeDirState}) =>{
  const [wish, setwish] = useState("")
  const [tab,selectedTab] = useState("employee")
  const [filtered, setFltered] = useState([])

  const handleChange = (val) => {
      setwish(val)
  }

  let directory = employeeDirState?.directory?.EmployeeDirectory
  const searchButton =()=>{
    var list = []
    if(tab=="employee"){
      directory?.filter(emp => emp.EmpName.toLowerCase().includes(wish.toLowerCase())).map(filteredName => (
        <li>
          {list.push(filteredName)}
        </li>
      ))
    }else{
      directory = employeeDirState?.directory?.ImpContacts
          directory?.filter(emp => (emp.Category.toLowerCase().includes(wish.toLowerCase()) || emp.LocationName.toLowerCase().includes(wish.toLowerCase()))).map(filteredName => (
        <li>
          {list.push(filteredName)}
        </li>
      ))
    }
    setFltered(list)
  }

  useEffect(() => {
    firebase.database()
    .ref('Directory')
    .once('value')
    .then(snapshot => {
      setEmployeeDirectory(snapshot.val())
    });   
  }, []);

  return (
    <View style={styles.container}>
   
      <View style={styles.buttonStyle}>
        <View style={[{width:"50%",padding:2}]}>
          <Button
              title="Employee Directory"
              color= {tab=="employee"?"darkblue": "lightgray"}
              onPress={()=>selectedTab("employee")}
          >
          </Button>
        </View> 
        <View style={[{width:"50%",padding:2}]}>
          <Button
                title="Important Contacts"
                color=  {tab!="employee"?"darkblue": "lightgray"}
                onPress={()=>selectedTab("impcontacts")}
            />
        </View> 
      </View> 
  
      <View style={{ flexDirection: "row" ,padding:2}}>
        <TextInput
          style={{ height: 30, borderColor: 'gray', borderWidth: 1 , flex: 1, width:'80%'}}
          onChangeText={(val) => handleChange(val)}
          placeholder="Write search input.."
        />

        <TouchableOpacity activeOpacity={0.95} style={styles.button} 
          onPress={() => searchButton()}>
          <Text style={styles.button_text}>Search</Text>
        </TouchableOpacity>
      </View>

      {tab=="employee"?
        <FlatList
          numColumns={1}
          horizontal={false}
          data={filtered}
          renderItem={({ item }) => (
            <View  style={styles.containerList} >
              <Text style={styles.birthday_name}>Name - {item.EmpName}</Text>
              <Text >Department - {item.Department}</Text>
              <Text >Designation - {item.Designation}</Text>
              <Text >EmailID - {item.EmailID}</Text>
              <Text >EmpCode - {item.EmpCode}</Text>
              <Text >Mobile - {item.Mobile}</Text>
            </View>
          )}
        />:
        <FlatList
          numColumns={1}
          horizontal={false}
          data={filtered}
          renderItem={({ item }) => (
            <View  style={styles.containerList} >
              <Text style={styles.birthday_name}>Name/Location - {item.LocationName}</Text>
              <Text >Category - {item.Category}</Text>
              <Text >Intercom - {item.Intercom}</Text>
              <Text >Phone - {item.Phone}</Text>
              <Text >EmailID - {item.Email}</Text>
            </View>
          )}
      />
      }
    </View>
  )
}

function mapStateToProps({ employeeDirState}) {
    return {
        employeeDirState
    };
}
  
function mapDispatchToProps(dispatch) {
  return {
    setEmployeeDirectory: (data) => dispatch({
        type: "EMPLOYEE",
        data:data
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDirectory);

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
