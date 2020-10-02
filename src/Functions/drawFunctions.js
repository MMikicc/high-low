export const drawImage = (ctx, image, x, y) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const imageFile = new Image();
  imageFile.src = image;
  imageFile.onload = () => {
    ctx.drawImage(imageFile, x, y);
  };
};

export const drawRect = (ctx, x, y, width, height, color) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(x, y, width, height);
  ctx.stroke();
};
