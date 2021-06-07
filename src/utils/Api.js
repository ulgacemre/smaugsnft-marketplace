import axios from 'axios';

export const DOWNLOAD_NFTS_URL = "http://116.203.189.226:3000/api/Containers/nfts/download/";
export const DOWNLOAD_USERS_URL = "http://116.203.189.226:3000/api/Containers/users/download/";

export default axios.create({
  baseURL: 'http://116.203.189.226:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  params: {
    'access_token': 'UgtEdXYhEDVL8KgL84yyzsJmdxuw2mTLB9F6tGXKCCUh4Av6uBZnmiAqjoYZQBlS'
  }
});
