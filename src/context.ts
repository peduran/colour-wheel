import { createContext } from "react"

export interface Context {
  audioContext: AudioContext
}

const audioContext = new AudioContext()
export const context = createContext<Context>({ audioContext })
