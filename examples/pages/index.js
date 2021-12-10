import useVideometrics from 'videometrics/useVideometrics';

const Home = () => {

  const [videoRef] = useVideometrics({
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
