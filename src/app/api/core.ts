import axios from 'axios';

interface Headers {
  'Content-Type': string,
}

const headers: Headers = {
  'Content-Type': 'application/json',
}

export const get = async (url: string) => (
  axios.get(url,{ headers: { ...headers }})
);

export const post = async (url: string, data = {}) => (
  axios.post(url, data, { headers: { ...headers }})
);
