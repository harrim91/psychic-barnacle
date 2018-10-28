import decode from 'jwt-decode';
import moment from 'moment';
import { SecureStore } from 'expo';

const KEY = 'api-token';

const saveData = (myKey, myValue) => {
  console.log(typeof myValue, myKey);
  return SecureStore.setItemAsync(myKey, myValue);
};
const getData = myKey => SecureStore.getItemAsync(myKey);

const setToken = token => SecureStore.setItemAsync(KEY, token);

const getToken = () => SecureStore.getItemAsync(KEY);

const removeToken = () => SecureStore.deleteItemAsync(KEY);

const getTokenPayload = async () => {
  const token = await getToken();
  return token && decode(token);
};

const isTokenValid = async () => {
  const token = await getTokenPayload();
  return Boolean(token && ((!token.exp) || (moment().unix() < token.exp)));
};

export default {
  setToken,
  getToken,
  getTokenPayload,
  isTokenValid,
  removeToken,
  saveData,
  getData,
};
