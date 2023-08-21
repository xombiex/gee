var audio = document.getElementById('audio')
document.getElementById('enter').addEventListener('click', function () {
  const _0x53c6c7 = document.getElementById('enter')
  _0x53c6c7.style.opacity = '0'
  _0x53c6c7.addEventListener('transitionend', () => _0x53c6c7.remove())
  typeof window.orientation == 'undefined' && audio.play()
})
audio.onended = function () {
  audio.play()
}
let volume = document.querySelector('#volume')
volume.addEventListener('change', function (_0x37049d) {
  audio.volume = _0x37049d.currentTarget.value / 100
})
var domain = window.location.hostname
if (domain != 'ruub.dev') {
  var vol = document.getElementById('volume')
  vol.parentNode.removeChild(vol)
}
