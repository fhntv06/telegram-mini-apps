import axios from 'axios';

const url = `${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_PORT}`

interface Headers {
  'Content-Type': string,
}

const headers: Headers = {
  'Content-Type': 'application/json',
}

export const get = (handle: string) => (
  axios.get(`${url}${handle}`,{ headers: { ...headers }})
)

export const post = (handle: string, data = {}) => (
  axios.post(`${url}${handle}`, data, { headers: { ...headers }})
);
