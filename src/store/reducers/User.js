import {
    USER_DATA,
} from "../../constants/ActionTypes";

import { DOWNLOAD_USERS_URL } from '../../utils/Api';
import defaultAvatar from '../../assets/images/avatar/default.png'

const INIT_STATE = {
    user_info: {
        walletAddress: "",
        email: "",
        displayName: "",
        customUrl: null,
        bio: null,
        imageUrl: "",
        website: "",
        createdOn: "",
        twitterUsername: "",
        facebookUsername: "",
        instagramUsername: "",
    },
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                user_info: {
                    ...action.payload,
                    avatar: action.payload.imageUrl === '' ? defaultAvatar :
                        DOWNLOAD_USERS_URL + action.payload.imageUrl
                },
            };
        default:
            return state;
    }
}
