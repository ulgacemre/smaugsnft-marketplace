import {
    NFT_CREATED,
    NFT_DATA,
    NFT_USER_SINGLE_DATA,
    NFT_USER_MULTIPLE_DATA,
} from "../../constants/ActionTypes";

import { DOWNLOAD_NFTS_URL } from '../../utils/Api';

const INIT_STATE = {
    isCreated: false,
    currentNFT: {
        tokenId: 0,
        itemName: "",
        salePrice: 0,
        description: "",
        imageUrl: "",
        royalties: "",        
        size: "",      
        property: "",      
        putSale: true,      
        createdOn: "",
        walletAddress: "",
    },
    singleNFTs: [],
    multipleNFTs: [],    
    userSingleNFTs: [],
    userMultipleNFTs: []
};
  
export default (state = INIT_STATE, action) => {
    switch (action.type) {
    case NFT_DATA:
        return {
            ...state,
            currentNFT: { 
                ...action.payload,
                image: DOWNLOAD_NFTS_URL + action.payload.imageUrl 
            },
        };
    case NFT_CREATED:
        return {
            ...state,
            isCreated: action.payload,
        };
    case NFT_USER_SINGLE_DATA:
        action.payload.map((item) => {
            item.image = DOWNLOAD_NFTS_URL + item.imageUrl
        })
        return {
            ...state,
            userSingleNFTs: [
                ...action.payload,
            ],
        };
    case NFT_USER_MULTIPLE_DATA:
        return {
            ...state,
            userMultipleNFTs: [
                ...action.payload,
            ],
        };
    default:
        return state;
    }
}
  