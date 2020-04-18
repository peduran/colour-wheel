import React from "react"
import useOscillator from "./useOscillatorHook"

interface Props {
  frequency: number
  updateFrequency: (f: number) => void
}
export default ({ frequency, updateFrequency }: Props) => {
  const { frequency: freqFromHook, start, stop } = useOscillator(frequency)
  return (
    <ul>
      <li>{freqFromHook} From hook</li>
      <li>{frequency} From prop</li>
      <li>
        <button onClick={stop}>stop</button>
      </li>
      <li>
        <button onClick={start}>start</button>
      </li>
      <li>
        <input
          value={frequency}
          onChange={(e) => updateFrequency(Number(e.target.value))}
        ></input>
      </li>
    </ul>
  )
}
