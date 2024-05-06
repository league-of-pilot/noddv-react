const videoId = "df3d845566262a791bb913201";
const videoName = `${videoId}.mp4`;
export default function VideoPlayer() {
  return (
    <div>
      <p>Static path</p>
      <video controls width={500} autoPlay>
        <source
          src={`http://localhost:4007/static/videos/temp/${videoName}`}
          type="video/mp4"
        />
      </video>
    </div>
  );
}
