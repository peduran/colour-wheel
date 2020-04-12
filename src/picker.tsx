import React from "react";
export default () => {
  const ref = React.useRef<HTMLCanvasElement>(null);

  const getRandomInt = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max));
  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas!.getContext("2d")!;
    const imageData = ctx.createImageData(100, 100);
    imageData.data.set(imageData.data.map(() => getRandomInt(255)));

    ctx.putImageData(imageData, 100, 100);
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        className="color-canvas"
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </>
  );
};
