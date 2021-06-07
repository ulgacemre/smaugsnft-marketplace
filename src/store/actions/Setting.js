import {
    CHANGE_THEME,
} from "../../constants/ActionTypes";
 

export const toggleTheme = () => {
    return {
        type: CHANGE_THEME,
        payload: {}
    }
}