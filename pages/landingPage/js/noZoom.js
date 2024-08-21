
try {
// 禁用双击缩放
document.addEventListener("touchstart", function(event) {
if (event.touches.length > 1) {
event.preventDefault();
}
});
var lastTouchEnd = 0;
document.addEventListener(
"touchend",
function(event) {
var now = new Date().getTime();
if (now - lastTouchEnd <= 300) {
  event.preventDefault();
}
lastTouchEnd = now;
},
false
);
// 禁用双指手势操作
document.addEventListener("gesturestart", function(event) {
event.preventDefault();
});
} catch (error) {}
