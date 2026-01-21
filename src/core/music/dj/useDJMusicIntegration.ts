import { useEffect } from 'react'
import { DJEventBus } from './DJEvents'
import { useMusicState } from '../MusicState'

export function useDJMusicIntegration(onPlayNext: (trackId: string) => void) {
  const setCurrentTrack = useMusicState((state) => state.setCurrentTrack)

  useEffect(() => {
    const unsubscribe = DJEventBus.subscribe('queue:next', (event) => {
      const { item } = event.data
      if (item && item.track) {
        setCurrentTrack(item.track)
        onPlayNext(item.track.id)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [onPlayNext, setCurrentTrack])
}
