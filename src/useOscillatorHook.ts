import React, { useContext, useEffect, useRef } from "react"
import { context } from "./context"


type UseOscillator = []
// type UseOscillator = [OscillatorNode]
 
 
const useOscillator = (): UseOscillator =>  {
  const {audioContext} = useContext(context)
    useEffect(()=> {
        const oscillator= audioContext.createOscillator()
        oscillator.connect(audioContext.destination)
        oscillator.start()
        return () => oscillator.stop() 
    })

    // return [oscillator]
    return []
}

export default useOscillator
