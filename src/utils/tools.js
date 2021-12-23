export function debounce(fn, delay) {
  let timer = null;
  return function () {
    const args = arguments;
    const constext = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(constext, args);
    }, delay);
  };
}

export function throttle(fn, delay) {
  let lastTime = 0;
  return function () {
    const args = arguments;
    const constext = this;
    const now = Date.now();
    if (now - lastTime > delay) {
      lastTime = now;
      fn.apply(constext, args);
    }
  };
}
