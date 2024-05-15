import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

export default function VerifyEmail() {
  //  Thật ra chỉ là 1 loading chờ useEffect run để navigate đi

  const [message] = useState('VerifyEmail')

  const loc = useLocation()
  const [searchParams] = useSearchParams()
  const paramsObj = Object.fromEntries(searchParams) as {
    token?: string
  }

  console.log('🚀 ~ router-dom:', { paramsObj, searchParams, loc })

  useEffect(() => {
    const controller = new AbortController()

    return () => {
      controller.abort()
    }
  })
  return <div>{message}</div>
}
