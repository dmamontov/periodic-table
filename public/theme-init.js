;(function () {
  try {
    var stored = localStorage.getItem('periodic-table-theme')
    var dark =
      stored === 'dark' ||
      ((stored === 'auto' || !stored) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (dark) document.documentElement.dataset.theme = 'dark'
  } catch (e) {}
})()
