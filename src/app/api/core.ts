import axios from 'axios';

import { getStorage } from '../../shared/utils/localStorage';

interface Headers {
  'Content-Type': string,
  'Authorization'?: string
}

const headers: Headers = {
  'Content-Type': 'application/json',
}

const getHeaders = () => {
  const token = getStorage('token');

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export const get = async (url: string) => (
  axios.get(url,{ headers: { ...getHeaders() }})
);

export const post = async (url: string, data = {}) => (
  axios.post(url, data, { headers: { ...getHeaders()}})
);

export const deleteMethod = async (url: string, data = {}) => (
  axios.delete(url, {data, headers: { ...getHeaders()}})
);
