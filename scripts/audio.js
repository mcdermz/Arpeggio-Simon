/*
noteFreq[4]["C"] = 261.625565300598634;
  noteFreq[4]["C#"] = 277.182630976872096;
  noteFreq[4]["D"] = 293.664767917407560;
  noteFreq[4]["D#"] = 311.126983722080910;
  noteFreq[4]["E"] = 329.627556912869929;
  noteFreq[4]["F"] = 349.228231433003884;
  noteFreq[4]["F#"] = 369.994422711634398;
  noteFreq[4]["G"] = 391.995435981749294;
  noteFreq[4]["G#"] = 415.304697579945138;
  noteFreq[4]["A"] = 440.000000000000000;
  noteFreq[4]["A#"] = 466.163761518089916;
  noteFreq[4]["B"] = 493.883301256124111;
*/

let toneObject = {
  // boxID : toneID
  1 : 261.625565300598634,
  2 : 329.627556912869929,
  3 : 391.995435981749294,
  4 : 493.883301256124111,
  5 : (261.625565300598634 * 2),
}
window.AudioContext = window.AudioContext||window.webkitAudioContext
let context = new AudioContext()
let osc = context.createOscillator()
let gainNode = context.createGain()
let muted = true


osc.connect(gainNode)
osc.start()



function playTone () {
  osc.frequency.value = oscList[oscList.length - 1]
  muted = false
  gainNode.connect(context.destination)
}

function stopTone () {
  if (oscList.length === 0) {
    muted = true
    gainNode.disconnect(context.destination)
  }
  else {
    osc.frequency.value = oscList[oscList.length - 1]
  }
}
