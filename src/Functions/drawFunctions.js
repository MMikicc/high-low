export const drawImage = (ctx, image, x, y) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(image, x, y);
};

export const drawRect = (ctx, x, y, width, height, color) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(x, y, width, height);
  ctx.stroke();
};
