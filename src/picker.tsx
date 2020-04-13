import React from "react"
import { Option, None, Some } from "space-lift"

export default () => {
  const smallCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const zoomCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const [url, setUrl] = React.useState<Option<string>>(None)
  const [colour, setColour] = React.useState<string>("white")

  const getRandomInt = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max))

  const setColourOnMouseMove = (context: CanvasRenderingContext2D) => (
    e: MouseEvent
  ): void => {
    const [x, y] = [e.clientX, e.clientY]
    const [r, g, b, a] = (context.getImageData(x, y, 1, 1)
      .data as unknown) as Array<number>
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`
    console.log(rgba)
    return setColour(rgba)
  }

  React.useEffect(() => {
    Option.all([smallCanvasRef.current, zoomCanvasRef.current]).fold(
      () => console.error("empty refs"),
      ([smallCanvas, zoomCanvas]) => {
        Option.all([
          smallCanvas.getContext("2d"),
          zoomCanvas.getContext("2d")
        ]).fold(
          () => console.error("get 2d context fails"),
          ([smallCanvasContext, zoomCanvasContext]) => {
            zoomCanvasContext.imageSmoothingEnabled = false
            const imageData = smallCanvasContext.createImageData(100, 100)
            const pixels = imageData.data
            imageData.data.set(pixels.map(() => getRandomInt(255)))

            smallCanvasContext.putImageData(imageData, 0, 0)
            zoomCanvasContext.drawImage(smallCanvas, 0, 0, 1000, 1000)

            setUrl(Some(zoomCanvas.toDataURL()))

            zoomCanvas.addEventListener(
              "mousemove",
              setColourOnMouseMove(zoomCanvasContext)
            )
          }
        )
      }
    )
  }, [])

  return (
    <>
      <div style={{ backgroundColor: colour }}>
        <canvas
          ref={smallCanvasRef}
          className="small-canvas"
          width={100}
          height={100}
        ></canvas>
        <canvas
          ref={zoomCanvasRef}
          className="zoom-canvas"
          width={1000}
          height={1000}
        ></canvas>
        {url.map(_ => (
          <a key="1" href={_} download="image.png">
            download
          </a>
        ))}
      </div>
    </>
  )
}
