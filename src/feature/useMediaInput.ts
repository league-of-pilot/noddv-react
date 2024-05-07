import { useState } from 'react'

export const useMediaInput = () => {
  const [val, setVal] = useState('')
  const [isStatic, setIsStatic] = useState(true)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value)
  }

  const onClickButton = () => {
    setIsStatic(!isStatic)
  }

  return {
    val,
    isStatic,
    onInputChange,
    onClickButton
  }
}
