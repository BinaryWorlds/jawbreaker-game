/* eslint-disable */

export const isFullScreen = () =>
  !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );

export const openFullScreen = () => {
  if (isFullScreen()) return;
  const el = document.documentElement;

  const requestMethod =
    el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.webkitRequestFullScreen ||
    el.requestFullScreen ||
    el.mozRequestFullscreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen ||
    el.msRequestFullScreen;

  if (requestMethod) requestMethod.call(el);
  else if (typeof window.ActiveXObject !== 'undefined') {
    const wscript = new ActiveXObject('WScript.Shell');
    if (wscript) wscript.SendKeys('{F11}');
  }
};

export const closeFullScreen = () => {
  if (!isFullScreen()) return;
  const el = document;

  const requestMethod =
    el.exitFullscreen ||
    el.exitFullScreen ||
    el.webkitExitFullscreen ||
    el.webkitExitFullScreen ||
    el.mozCancelFullscreen ||
    el.mozCancelFullScreen ||
    el.msExitFullscreen ||
    el.msExitFullScreen ||
    el.cancelFullScreen ||
    el.webkitCancelFullscreen ||
    el.webkitCancelFullScreen;

  if (requestMethod) requestMethod.call(el);
  else if (typeof window.ActiveXObject !== 'undefined') {
    const wscript = new ActiveXObject('WScript.Shell');
    if (wscript) wscript.SendKeys('{F11}');
  }
};
