import axios from 'axios'
import { baseUrl } from '../app/app.const'

export type TGetMe = {
  name: string
  email: string
  username: string
  verify: number
  _id: string
}

export const getMe = (access_token: string, controller: AbortController) =>
  axios.get<TGetMe>('/users/getMe', {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    baseURL: baseUrl,
    signal: controller.signal
  })
