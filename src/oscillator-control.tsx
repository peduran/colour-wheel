import React from 'react'

interface OscilatorControlProps {
    oscillator: OscillatorNode
  }
export const OscilatorControl = ({oscillator}: OscilatorControlProps) => {
    return (
      <>
        <button onClick={() => oscillator.stop()}>stop</button>
        <button onClick={() => oscillator.start()}>start</button>
        <input
          value={oscillator.frequency.value}
          onChange={(e) => { oscillator.frequency.value = Number(e.target.value)}}
        />
      </>
    )
  }
  