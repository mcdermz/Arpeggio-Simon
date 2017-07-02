let toneObject = {
  // boxID : toneID
  1 : '#c1',
  2 : '#e1',
  3 : '#g1',
  4 : '#b1',
  5 : '#c8',
}
window.AudioContext = window.AudioContext||window.webkitAudioContext;
let context = new AudioContext();
let osc = context.createOscillator();
let gainNode = context.createGain();
osc.connect(gainNode);
osc.start()



function playTone (toneID) {
  gainNode.connect(context.destination)
}

function stopTone (toneID) {
  gainNode.disconnect(context.destination);
}
