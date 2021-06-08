import {
  SET_USER_TOKEN,
  SET_USER_WALLET,
  FETCH_ERROR,
  SIGNIN_ERROR,
} from "../../constants/ActionTypes";
import axios from '../../utils/Api'

export const signInUser = ({email, password}) => {
  return (dispatch) => {
    axios.post('Users/login', {
        email: email,
        password: password,
      }
    ).then(({data}) => {
      if (data.id) {
        localStorage.setItem("token", JSON.stringify(data.id));
        localStorage.setItem("wallet", JSON.stringify(data.userId));
        //axios.defaults.headers.common['Authorization'] = "Bearer " + data.id;
        axios.defaults.params = {};
        axios.defaults.params['access_token'] = data.id;
        dispatch({type: SET_USER_TOKEN, payload: data.id});
        dispatch({type: SET_USER_WALLET, payload: data.userId});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      //console.log(error);
      dispatch({type: SIGNIN_ERROR, payload: error.message});
      //console.log("Error****:", error.message);
    });
  }
};
