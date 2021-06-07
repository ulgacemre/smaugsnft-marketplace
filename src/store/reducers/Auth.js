import {
    SET_USER_TOKEN,
    SET_USER_WALLET,
} from "../../constants/ActionTypes";
  
const INIT_STATE = {
    //token: JSON.parse(localStorage.getItem('token')),
    //walletAddress: JSON.parse(localStorage.getItem('wallet')),
    walletAddress: '',    
    signUpSuccess: false,
    showMessage: false
};
  
export default (state = INIT_STATE, action) => {
    switch (action.type) {
    
      case SET_USER_TOKEN: {
        return {
          ...state,
          token: action.payload,
        };
      }

      case SET_USER_WALLET: {
        return {
          ...state,
          walletAddress: action.payload,
        };
      }
      default:
        return state;
    }
}
  