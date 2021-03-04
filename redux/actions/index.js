import  firebase from '../../components/firebase'

export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: "USER_STATE_CHANGE", currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export function fetchBirthdays() {
    // let date_today = new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString()
    // console.log(date_today)
    console.log("Get Date")

    return ((dispatch) => {
        console.log("Get Data")
        firebase.firestore()
            .collection("users")
            // .orderBy("birthday", "asc")
            // .where("birthday",">=",)
            .get()
            .then((snapshot) => {
                console.log("Get Data")
                console.log(snapshot.data())

                dispatch({ type: "BIRTHDAY", date: snapshot.data() })
            })
    })
}

export const getBirthdays = () => {
    return function (dispatch) {
        firebase.firestore()
            .collection("users")
            // .orderBy("birthday", "asc")
            // .where("birthday",">=",)
            .get()
            .then((snapshot) => {
                console.log("Get Data")
                console.log(snapshot.data())

                dispatch({ type: "BIRTHDAY", date: snapshot.data() })
            })
    };
};

export const getHopMessage= () =>{
    return function (dispatch){
        firebase.firestore().collection("hop/hop")
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                dispatch({ type: "HOP_MESSAGE", currentUser: snapshot.data() })
            }
            else {
                console.log('does not exist')
            }
        })
    }
}