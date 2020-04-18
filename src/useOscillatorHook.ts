import React, { useContext, useEffect, useRef } from "react"

const audioContext = new window.AudioContext()

type UseOscillator = [OscillatorNode]
 
 
const useOscillator = (): UseOscillator =>  {
    const oscillator = useRef<OscillatorNode>()
    useEffect(()=> {
        oscillator.current = audioContext.createOscillator()
        oscillator.current.connect(audioContext.destination)
        oscillator.current.start()
        return () => oscillator.current?.stop() 
    })

    return [oscillator]
}

export default useOscillator
