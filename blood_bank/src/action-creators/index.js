
import fire from '../files/firebase'

export const Login = (password) => {
    return (dispatch) => {
        try {
            fire.firestore().collection("admin").where("password", "==", password).get().then((snapshot) => snapshot.forEach((ele) => {
                var data = ele.data();
                //console.log(data);
                if (data != null) {
                    return dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: data,
                    });
                } if (data == "") {
                    return dispatch({
                        type: "LOGIN_FAILED",
                    });
                }

            }))
        } catch (error) {
            dispatch({
                type: "LOGIN_FAILED",
            })
        }
    }
}



export const studentLogin = (email, password) => {
    return (dispatch) => {
        try {
            fire.auth().signInWithEmailAndPassword(email, password).then(() => {
                fire.firestore().collection("students").where("email", "==", email).where("password", "==", password).get().then((snapshot) => {
                    snapshot.forEach((ele) => {
                        var data = ele.data();
                        if (data != null) {
                            return dispatch({
                                type: "LOGIN_SUCCESS",
                                payload: data,
                            })
                        } else {
                            return dispatch({
                                type: "LOGIN_FAILED",
                            });
                        }
                    })
                })
            });

        } catch (error) {
            dispatch({
                type: "LOGIN_FAILED",
            })
        }
    }
}

