import React from "react"
import useOscillator from "use-oscillator"

interface Props {
  frequency: number
  updateFrequency: (f: number) => void
}
export default ({ frequency, updateFrequency }: Props) => {
  const { start, stop } = useOscillator(frequency)
  return (
    <ul>
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
