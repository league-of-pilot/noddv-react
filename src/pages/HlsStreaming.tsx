import { MediaPlayer, MediaProvider } from '@vidstack/react'
import {
  PlyrLayout,
  plyrLayoutIcons
} from '@vidstack/react/player/layouts/plyr'

// import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/plyr/theme.css'
import { Fragment, useState } from 'react'
import { GetVidSrcInput } from '../feature/VideoPlayer'
import { useMediaInput } from '../feature/useMediaInput'

const demoSrc = 'https://files.vidstack.io/sprite-fight/hls/stream.m3u8'

const vidStaticPath = 'http://localhost:4007/static/videos/'
const apiStreamPath = 'http://localhost:4007/api/video-hls/'
const masterFile = '/master.m3u8'

export default function HlsStreaming() {
  const { val, isStatic, onInputChange, onClickButton } = useMediaInput()
  const [vidSrc, setVidSrc] = useState(demoSrc)

  const debug = {
    isStatic: isStatic ? '✅' : '❌',
    vidSrc
  }

  const getLink = () => {
    const src = isStatic
      ? `${vidStaticPath}${val}${masterFile}`
      : `${apiStreamPath}${val}${masterFile}`
    setVidSrc(src)
  }

  return (
    <div>
      <h1>HlsStreaming</h1>
      <GetVidSrcInput {...{ val, isStatic, onClickButton, onInputChange }} />
      <div>{JSON.stringify(debug, null, 2)}</div>
      <button onClick={getLink}>Submit</button>

      <VidStackPlayer src={vidSrc} />
    </div>
  )
}

const VidStackPlayer = ({ src }: { src: string }) => {
  return (
    // <Fragment key={src}>
    <Fragment>
      <div style={{ width: '700px' }}>
        <MediaPlayer title='Sprite Fight' src={src}>
          <MediaProvider />
          <PlyrLayout icons={plyrLayoutIcons} />
        </MediaPlayer>
      </div>
      {/* Does not work somehw */}
      {/* <MediaPlayer
          title='Sprite Fight'
          src='https://files.vidstack.io/sprite-fight/720p.mp4'
        >
          <MediaProvider />
        </MediaPlayer> */}
    </Fragment>
  )
}
