import axios from 'axios'
import { SyntheticEvent, useRef } from 'react'
import { baseUrl } from '../app/app.const'

type TLoginRes = {
  result: { access_token: string; refresh_token: string }
}

export const LoginForm = () => {
  const refUser = useRef<HTMLInputElement>(null)
  const refPass = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const userVal = refUser.current?.value ?? ''

    const passVal = refPass.current?.value ?? ''

    const payload = {
      email: userVal,
      password: passVal
    }

    try {
      const {
        data: {
          result: { access_token, refresh_token }
        }
      } = await axios.post<TLoginRes>('users/login', payload, {
        baseURL: baseUrl
      })
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      window.location.reload()
    } catch (error) {
      // This catch is from GPT
      // Handle errors here
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 2xx
          alert(`Error: ${error.response.data.message}`)
        } else if (error.request) {
          // Request was made but no response received
          alert('Error: No response received from server')
        } else {
          // Something else happened during the request setup
          alert(`Error: ${error.message}`)
        }
      } else {
        // Non-Axios error
        alert(`Error: ${error}`)
      }
    }
  }

  return (
    <form className='flex-div-form-login' onSubmit={handleSubmit}>
      <label>
        user:{' '}
        <input ref={refUser} defaultValue='admin5@gmail.com' type='text' />
      </label>
      <label>
        pass: <input ref={refPass} type='password' defaultValue='admin123' />
      </label>
      <button type='submit' className='form-login-submit-btn'>
        Submit login
      </button>
    </form>
  )
}
