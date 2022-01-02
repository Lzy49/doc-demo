let rAF = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

let frame = 0;
let lastTime = Date.now();
let loopIng = false;
let loop = function () {
  let now = Date.now();
  // 每执行次增加一帧
  frame++;
  if (now > 1000 + lastTime) {
    // 每 1秒上报一次
    let fps = Math.round((frame * 1000) / (now - lastTime));
    console.log(`${new Date()} 1S内 FPS：`, fps);
    frame = 0;
    lastTime = now;
  }
  rAF(loop);
};
function getFps() {
  if (loopIng) {
    return;
  }
  loopIng = true;
  loop();
}
