document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");
  let isDrawing = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    if (window.innerWidth <= 600) {
      canvas.width = window.innerWidth * 0.9;
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    draw(e);
  }

  function endDrawing(e) {
    e.preventDefault();
    isDrawing = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!isDrawing) return;

    e.preventDefault();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
  }

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", endDrawing);
  canvas.addEventListener("mousemove", draw);

  canvas.addEventListener("touchstart", startDrawing, false);
  canvas.addEventListener("touchend", endDrawing, false);
  canvas.addEventListener("touchmove", draw, false);

  document.getElementById("downloadBtn").addEventListener("click", function () {
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "");
    link.download = "drawing_" + timestamp + ".png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  });
});
