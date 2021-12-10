import { useVideometrics } from 'videometrics/react';
import defaultConfig from 'videometrics/defaultConfig';
import s3 from 'videometrics/s3';

const Home = () => {

  const [videoRef] = useVideometrics({
    ...defaultConfig,
    ...s3,
    customData: {
      userId: '123',
      videoId: '456',
      tags: ['foo', 'bar'],
    }
  })

  return (
    <video ref={videoRef} src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" controls />
  )
}

export default Home
