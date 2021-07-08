import axios from 'axios';

export const DOWNLOAD_NFTS_URL = "https://smaugsapi.smaugs.com:3000/api/Containers/nfts/download/";
export const DOWNLOAD_USERS_URL = "https://smaugsapi.smaugs.com:3000/api/Containers/users/download/";
export const DOWNLOAD_COVERS_URL = "https://smaugsapi.smaugs.com:3000/api/Containers/covers/download/";

export default axios.create({
  baseURL: 'https://smaugsapi.smaugs.com:3000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  params: {
    'access_token': 'EutEdXYhEDVL8KgL84yyzsJmdxuw2mTLB9F6tGXKCCUh4Av6uBZnmiAqjoYZQBlS'
  }
});
