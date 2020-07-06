/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  let canvas = data.canvas;
  let context = canvas.getContext("2d");
  context.beginPath();
  for(let x = 0; x < 691; x++){
    for(let y = 0; y < 491; y++){
      context.fillRect(x, y, 10, 10);
    }
  }
});

