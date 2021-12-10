import {
  useEffect,
  useCallback,
  useMemo,
  useState
} from "react"
import VideoMetrics from "./main"

export function useVideometrics(config, initialVideoElement = null) {
  const [videoElement, setVideoElement] = useState(initialVideoElement);

  const videoRef = useCallback(node => {
    if (node !== null) {
      setVideoElement(node)
    }
  }, []);

  const instance = useMemo(
    () => videoElement && new VideoMetrics(videoElement, config)
    , [videoElement, config]
  )

  useEffect(() => () => instance && instance.stop(), [instance])

  const response = [videoRef, instance, setVideoElement]
  response.videoRef = videoRef
  response.instance = instance
  response.setVideoElement = setVideoElement
  return response
}