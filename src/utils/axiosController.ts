import { baseUrl } from '../app/app.const'

export const getAxiosController = () => {
  const controller = new AbortController()
  const access_token = localStorage.getItem('access_token') ?? ''

  const axiosOption = {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    baseURL: baseUrl,
    signal: controller.signal
  }

  return {
    controller,
    axiosOption
  }
}
