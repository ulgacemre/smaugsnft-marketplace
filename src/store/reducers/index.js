import {combineReducers} from "redux";
import Auth from "./Auth";
import User from "./User";
import NFTS from "./NFTS";
import Setting from "./Setting";

const reducers = combineReducers({
    auth: Auth,
    user: User,
    nfts: NFTS,
    setting: Setting

});

export default reducers;
