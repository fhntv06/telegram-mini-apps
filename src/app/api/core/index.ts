import axios from 'axios';

const url = `${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_PORT}`

interface Headers {
  'Content-Type': string,
}

const headers: Headers = {
  'Content-Type': 'application/json',
}

export const get = async (handle: string) => (
  axios.get(`${url}${handle}`,{ headers: { ...headers }})
)

export const post = async (url: string, data = {}) => (
  axios.post(url, data, { headers: { ...headers }})
);