import { useContext, useEffect, useState } from "react"
import { context } from "./context"

interface Oscillator {
  stop: () => void
  start: () => void
  frequency: number
}
const useOscillator = (frequency: number): Oscillator => {
  const { audioContext } = useContext(context)
  const [oscillator, setOscillator] = useState<OscillatorNode | undefined>(
    undefined
  )
  useEffect(() => {
    const oscillator = audioContext.createOscillator()
    oscillator.connect(audioContext.destination)
    oscillator.start()
    setOscillator(oscillator)

    return () => oscillator.stop()
  }, [audioContext])

  useEffect(() => {
    if (oscillator) {
      oscillator.frequency.value = frequency
    }
  }, [frequency, oscillator])

  return {
    frequency,
    stop: () => {oscillator?.disconnect()},
    start: () => {oscillator?.connect(audioContext.destination)}
  }
}

export default useOscillator
