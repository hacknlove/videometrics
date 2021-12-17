import { renderHook, act } from '@testing-library/react-hooks'
import { useVideometrics } from './react'
import defaultConfig from './defaultConfig'
import VideoMetrics from './main'

describe('react', () => {
  it('run', () => {
    const videoElement = document.createElement('video')
    const { result } = renderHook(() => useVideometrics(defaultConfig, videoElement))

    expect(result.current.instance).toBeInstanceOf(VideoMetrics)
    expect(result.current.setVideoElement).toBeInstanceOf(Function)
    expect(result.current.videoRef).toBeInstanceOf(Function)
  }) 
})