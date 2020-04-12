import React from "react";
export default () => {
  const ref1 = React.useRef<HTMLCanvasElement>(null);
  const ref2 = React.useRef<HTMLCanvasElement>(null);

  const getRandomInt = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max));
  React.useEffect(() => {
    const canvas1 = ref1.current;
    const canvas2 = ref2.current;
    const ctx = canvas1!.getContext("2d")!;
    const zoomCtx = canvas2!.getContext("2d")
    zoomCtx!.imageSmoothingEnabled = false

    const imageData = ctx.createImageData(100, 100);
    imageData.data.set(imageData.data.map(() => getRandomInt(255)));
    ctx.putImageData(imageData, 0,0);

    zoomCtx?.drawImage(canvas1!, 0,0, 1000,1000)    
  }, []);

  return (
    <>
      <canvas
        ref={ref1}
        className="color-canvas"
        width={100}
        height={100}
      ></canvas>
      <canvas
        ref={ref2}
        className="color-canvas-2"
        width={1000}
        height={1000}
      ></canvas>
      <a href={ref2.current?.toDataURL()}>download</a>
    </>
  );
};
