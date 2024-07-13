import axios from 'axios'
import { GATEWAY_ENUM } from './types'

const gatewayBaseUrlMap = {
  monnify: import.meta.env.VITE_MONNIFY_API_URL,
  flutterwave: import.meta.env.VITE_FLUTTERWAVE_API_URL
}

export const api = (gateway: GATEWAY_ENUM = GATEWAY_ENUM.MONNIFY) => {
  const axiosInstance = axios.create({
    baseURL: gatewayBaseUrlMap[gateway],
    headers: {
      'Content-Type': 'application/json',
      //if the preferred gateway is flutterwave use Bearer token for Authentication
      ...(gateway === GATEWAY_ENUM.FLUTTERWAVE
        ? {
            Authorization: `Bearer ${
              import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY
            }`
          }
        : {})
    },
    //if the preferred gateway is monnify use Basic Authentication
    ...(gateway === GATEWAY_ENUM.MONNIFY
      ? {
          auth: {
            username: import.meta.env.VITE_MONNIFY_API_KEY,
            password: import.meta.env.VITE_MONNIFY_SECRET_KEY
          }
        }
      : {})
  })

  return axiosInstance
}
