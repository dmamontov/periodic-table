;(function () {
  try {
    var standalone =
      window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
    if (standalone) document.documentElement.classList.add('pwa-standalone')
  } catch (e) {}
})()
