import React, { useState, useEffect, useContext } from "react"
import { context } from "./context"

interface Props {
  frequency: number
}
export default ({ frequency }: Props) => {
  const [oscillator, updateOscillator] = useState<OscillatorNode | undefined>(
    undefined
  )
  const { audioContext } = useContext(context)

  useEffect(() => {
    const oscillator = audioContext.createOscillator()
    oscillator.frequency.value = frequency
    updateOscillator(oscillator)
    oscillator.connect(audioContext.destination)
    oscillator.start()
    return () => {
      oscillator.stop()
      oscillator.disconnect()
    }
  }, [])

  useEffect(() => {
    if (oscillator) {
      oscillator.frequency.value = frequency
    }
  }, [frequency])

  return null
}
