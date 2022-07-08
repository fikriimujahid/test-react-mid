import axios from 'axios';

let api = getApiAxiosInstance() 

export function getApiAxiosInstance() {
  return axios.create({
    baseURL: 'http://localhost:3001/api/',
  });
}

export function getVersion() {
  return api.get('version');
}

export async function getAccessToken() {
  const response = await api.get('v1/getAccessToken');
  return setBearerToken(response.data.access_token);
}

export function setBearerToken(token) {
  return new Promise((resolve) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    resolve(token);
  })
}

export async function getAllMatches(){
  await getAccessToken();
  return api.get('v1/getAllMatches');
}