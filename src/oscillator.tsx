import React from "react"
import useOscillator from "./useOscillatorHook"

interface Props {
  frequency: number
}
export default ({ frequency }: Props) => {
  const { frequency: freqFromHook, start, stop } = useOscillator(frequency)
  return (
    <ul>
      <li>{freqFromHook} From hook</li>
      <li>{frequency} From prop</li>
      <li> <button onClick={stop}>stop</button></li>
      <li> <button onClick={start}>start</button></li>
    </ul>
  )
}
