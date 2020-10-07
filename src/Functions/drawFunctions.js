export const drawImage = (ctx, image, x, y, width, height) => {
  ctx.drawImage(image, x, y, width, height);
};

export const drawRect = (ctx, x, y, width, height, color) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(x, y, width, height);
  ctx.stroke();
};
