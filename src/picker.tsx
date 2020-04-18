import React from "react"
import { None, Option } from "space-lift"
import Oscillator from "./oscillator"

const getRandomInt = (max: number): number =>
  Math.floor(Math.random() * Math.floor(max))

export default () => {
  console.log("rendered")
  const zoomCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const [url, setUrl] = React.useState<Option<string>>(None)
  const [colour, setColour] = React.useState<string>("white")
  const [frequency, setFrquency] = React.useState<number>(450)


  const test = (e: React.MouseEvent<HTMLCanvasElement>) => {
  }

  React.useEffect(() => {
    Option.all([zoomCanvasRef.current]).fold(
      () => console.error("empty refs"),
      ([zoomCanvas]) => {
        Option.all([
          zoomCanvas.getContext("2d"),
        ]).fold(
          () => console.error("get 2d context fails"),
          ([zoomCanvasContext]) => {
            zoomCanvasContext.imageSmoothingEnabled = false
            const imageData = zoomCanvasContext.createImageData(400, 400)
            const pixels = imageData.data
            imageData.data.set(pixels.map(() => getRandomInt(255)))
            zoomCanvasContext.putImageData(imageData, 0, 0)

            const handleMouseMove = (e: MouseEvent) => {
              const [x, y] = [e.clientX, e.clientY]
              const [r, g, b, a] = (zoomCanvasContext.getImageData(x, y, 1, 1)
                .data as unknown) as Array<number>

              const handleUpdateColours = () => {
                const rgba = `rgba(${r}, ${g}, ${b}, ${a})`
                setColour(rgba)
              }

              const handleUpdateFrequency = () => {
                setFrquency(r + b + g + a)
              }

              handleUpdateColours()
              handleUpdateFrequency()
            }
              zoomCanvas.addEventListener('mousemove', handleMouseMove)
          }

        )
      }
    )
  }, [])

  return (
    <>
      <div style={{ backgroundColor: colour }}>
        <canvas
          ref={zoomCanvasRef}
          className="zoom-canvas"
          width={400}
          height={400}
        ></canvas>
        <Oscillator frequency={frequency}/>
        {frequency}
        {url.map((_) => (
          <a key="1" href={_} download="image.png">
            download
          </a>
        ))}
      </div>
    </>
  )
}
