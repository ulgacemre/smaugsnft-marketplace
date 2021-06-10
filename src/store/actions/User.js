import {
  USER_DATA,
  FETCH_ERROR,
} from "../../constants/ActionTypes";
import axios from '../../utils/Api'


export const getUserInfo = ({ walletAddress }) => {
  return (dispatch) => {
    axios.get(`Users/${walletAddress}`)
      .then(({ data }) => {
        dispatch({ type: USER_DATA, payload: data });
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  }
};

const updateUserProfile = (dispatch, { walletAddress, displayName, customUrl, bio, imageUrl, website, twitterUsername, facebookUsername, instagramUsername }) => {
  axios.get(`Users/${walletAddress}/exists`)
    .then(({ data }) => {
      if (data.exists) {
        axios.patch(`Users/${walletAddress}`, {
          displayName,
          customUrl,
          imageUrl,
          website,
          bio,
          twitterUsername,
          facebookUsername,
          instagramUsername
        })
          .then(({ data }) => {
            dispatch({ type: USER_DATA, payload: data });
          }).catch(function (error) {
            dispatch({ type: FETCH_ERROR, payload: error.message });
          });
      } else {
        axios.post(`Users`, {
          walletAddress,
          displayName,
          customUrl,
          imageUrl,
          website,
          bio,
          twitterUsername,
          facebookUsername,
          instagramUsername
        })
          .then(({ data }) => {
            dispatch({ type: USER_DATA, payload: data });
          }).catch(function (error) {
            dispatch({ type: FETCH_ERROR, payload: error.message });
          });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
}

export const updateUserInfo = ({ walletAddress, displayName, customUrl, bio, avatar, avatarChanged, website, twitterUsername, facebookUsername, instagramUsername }) => {
  return (dispatch) => {
    if (avatarChanged) {
      const formData = new FormData();
      // Update the formData object 
      formData.append(
        "file",
        avatar,
        avatar.name
      );

      axios.post(`Containers/users/upload`, formData)
        .then(({ data }) => {
          const imageUrl = data.result.files.file[0].name;
          updateUserProfile(dispatch, { walletAddress, displayName, customUrl, bio, imageUrl, website })
        })
        .catch((error) => {
          dispatch({ type: FETCH_ERROR, payload: error.message });
        })

    } else {
      updateUserProfile(dispatch, { walletAddress, displayName, customUrl, bio, website, imageUrl: avatar, twitterUsername, facebookUsername, instagramUsername })
    }
  }
};
