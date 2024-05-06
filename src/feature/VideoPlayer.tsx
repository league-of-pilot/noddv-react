import { useState } from "react"

const dummyFileExtCheck = (fileUrl: string) => {
  const fileName = fileUrl.split("/").pop()
  const fileNameArr = fileName?.split(".")
  if (!fileNameArr || fileNameArr.length < 2) {
    return false
  }
  const fileExt = fileNameArr.pop()
  const isExtValid = fileExt && fileExt.length < 5
  return !!isExtValid
}

const vidStaticPath = "http://localhost:4007/static/videos/temp/"
type TFlexDirection = "row" | "row-reverse" | "column" | "column-reverse"
const flexGap = {
  display: "flex",
  gap: "1rem",
  flexDirection: "column" as TFlexDirection
}

export default function VideoPlayer() {
  const [val, setVal] = useState("")
  const [vidSrc, setVidSrc] = useState("")
  const onClick = () => {
    const src = `${vidStaticPath}${val}`
    setVidSrc(src)
  }

  const isSrcValidExt = dummyFileExtCheck(vidSrc)

  console.log({ isSrcValidExt, vidSrc })
  return (
    <div style={flexGap}>
      <div style={flexGap}>
        <p>Static path</p>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button onClick={onClick}>Submit</button>
      </div>
      {isSrcValidExt && <Video vidSrc={vidSrc} />}
    </div>
  )
}

// Bọc component lại vẫn ko re-render, phải gán key vào
const Video = ({ vidSrc }: { vidSrc: string }) => (
  <video key={vidSrc} controls width={500} autoPlay>
    <source src={vidSrc} type="video/mp4" />
    <track kind="captions" />
  </video>
)
