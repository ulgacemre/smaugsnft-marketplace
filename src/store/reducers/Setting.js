import {
    CHANGE_THEME,
} from "../../constants/ActionTypes";

const savedTheme = JSON.parse(localStorage.getItem('theme'));

const INIT_STATE = {
    theme: savedTheme ? savedTheme : "white",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
    case CHANGE_THEME:
        const theme = state.theme === "dark" ? "white" : "dark";
        localStorage.setItem("theme", JSON.stringify(theme));
        return {
            ...state,
            theme: theme,
        };
    default:
        return state;
    }
}
  