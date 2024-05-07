import { useState } from 'react'
import { useMediaInput } from './useMediaInput'

const dummyFileExtCheck = (fileUrl: string) => {
  const fileName = fileUrl.split('/').pop()
  const fileNameArr = fileName?.split('.')
  if (!fileNameArr || fileNameArr.length < 2) {
    return false
  }
  const fileExt = fileNameArr.pop()
  const isExtValid = fileExt && fileExt.length < 5
  return !!isExtValid
}

const vidStaticPath = 'http://localhost:4007/static/videos/'
const apiStreamPath = 'http://localhost:4007/api/video-stream/'

type TFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
const flexGap = {
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column' as TFlexDirection
}


export default function VideoPlayer() {
  const [vidSrc, setVidSrc] = useState('')
  const { val, isStatic, onInputChange, onClickButton } = useMediaInput()

  const getLink = () => {
    const src = isStatic ? `${vidStaticPath}${val}` : `${apiStreamPath}${val}`
    setVidSrc(src)
  }

  const isSrcValidExt = dummyFileExtCheck(vidSrc)

  const debug = {
    isStatic: isStatic ? '✅' : '❌',
    vidSrc,
    isSrcValidExt
  }

  return (
    <div style={flexGap}>
      <GetVidSrcInput {...{ val, isStatic, onClickButton, onInputChange }} />

      <div>
        <div>{JSON.stringify(debug, null, 2)}</div>
        <button onClick={getLink}>Submit</button>
      </div>

      {isSrcValidExt && <Video vidSrc={vidSrc} />}
    </div>
  )
}

// Bọc component lại vẫn ko re-render, phải gán key vào
const Video = ({ vidSrc }: { vidSrc: string }) => (
  <video key={`${vidSrc}`} controls width={500} autoPlay>
    <source src={vidSrc} type='video/mp4' />
    <track kind='captions' />
  </video>
)

export const GetVidSrcInput = ({
  val,
  isStatic,
  onClickButton,
  onInputChange
}: {
  val: string
  isStatic: boolean
  onClickButton: () => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  useMediaInput()
  return (
    <div style={{ width: '50%' }}>
      <div style={flexGap}>
        <button onClick={onClickButton}>
          {isStatic ? 'static mode' : 'stream mode'}
        </button>
      </div>
      <div style={flexGap}>
        <p>Static path</p>
        <input type='text' value={val} onChange={onInputChange} />
      </div>
    </div>
  )
}
