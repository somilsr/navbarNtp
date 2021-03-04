import React, { useEffect ,useState} from 'react';
import { View, Text, StyleSheet,
  FlatList,
  Button} from 'react-native';
import  firebase from '../components/firebase'
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

const WebLinks = ({navigation,setEmployeeDirectory,circularState}) =>{
    const [tab,selectedTab] = useState("list")
    const [url,selectedUrl] = useState("")

    const links = [
        {"name":"Indian Railways","url":"http://www.indianrail.gov.in/enquiry/StaticPages/StaticEnquiry.jsp?StaticPage=index.html"},
        {"name":"IRCTC","url":"https://www.irctc.co.in/nget/train-search"},
        {"name":"Train Enquiry","url":"https://enquiry.indianrail.gov.in/ntes/index.html"},
        {"name":"Online SBI","url":"https://www.onlinesbi.com/"}
    ]

    const handleClick=(url)=>{
      selectedTab("webview")
      selectedUrl(url)
    }

  return (
      <View style={styles.container}>
          {tab=="list"?
          <FlatList
              numColumns={1}
              horizontal={false}
              data={links}
              renderItem={({item}) => (
              <View style={styles.containerList} >
                  <Text style={styles.birthday_name} onPress={()=>handleClick(item.url)}>{item.name}</Text>
              </View>
              )}
          />:
          <View style={styles.view}>
            <WebView source = {{uri: url}} />
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(WebLinks);

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
    view: {
      alignSelf: 'stretch',
      flex: 1,
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
