import Web3 from "web3";
import {
  CURRENT_NFT,
  NFT_CREATED,
  FETCH_ERROR,
  NFT_USER_SINGLE_DATA,
  NFT_USER_MULTIPLE_DATA
} from "../../constants/ActionTypes";
import useWeb3 from "../../shared/hooks/useWeb3";
import axios from '../../utils/Api'



export const setNFTCreated = (status) => {
  return {
    type: NFT_CREATED,
    payload: status
  }
}

export const createNFT = ({ nft_info, imageFile }) => {
  return (dispatch) => {

    const formData = new FormData();
    // Update the formData object 
    formData.append(
      "file",
      imageFile,
      imageFile.name
    );

    axios.post(`Containers/nfts/upload`, formData)
      .then(({ data }) => {
        const imageUrl = data.result.files.file[0].name;
        axios.post(`single`, {
          imageUrl: imageUrl,
          ...nft_info
        }).then(async ({ data }) => {

          //console.log("created new token: ", data);
          
          localStorage.setItem("3295893275832758235", data.id);

          dispatch({ type: CURRENT_NFT, payload: data });
          dispatch(setNFTCreated(true))
       
        }).catch(function (error) {
          //console.log(error);
          dispatch({ type: FETCH_ERROR, payload: error.message });
          //console.log("Error****:", error.message);
        });
      })
      .catch((error) => {
        //console.log(error);
        dispatch({ type: FETCH_ERROR, payload: error.message });
        //console.log("Error****:", error.message);
      })
  }
};

export const getUserSingleNFTs = (walletAddress) => {
  return (dispatch) => {
    axios.get(`Users/${walletAddress}/single`)
      .then(({ data }) => {
        dispatch({ type: NFT_USER_SINGLE_DATA, payload: data });
      }).catch(function (error) {
        console.log(error);
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
      });
  }
};
