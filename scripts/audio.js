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
  5 : (261.625565300598634 * 2).toPrecision(),
}

window.AudioContext = window.AudioContext||window.webkitAudioContext
let monosynth = false
let context = new AudioContext()
let gainNode = context.createGain()
let oscActive = {}
let osc = context.createOscillator()
let muted = true
let oscList = []
gainNode.connect(context.destination)
gainNode.gain.value = 0
osc.connect(gainNode)
osc.start()

function playTone (tone) {
  if (tone && !oscActive[tone]){
    if (monosynth){
      oscActive[tone] = true
      oscList.push(tone)
      osc.frequency.value = tone
      osc.frequency.value = oscList[oscList.length - 1]
      gainNode.gain.value = 1
    }
    else {
      oscActive[tone] = context.createOscillator()
      let osc = oscActive[tone]
      let oscGainNode = context.createGain()
      oscGainNode.connect(context.destination)
      osc.gain = oscGainNode.gain
      osc.frequency.value = tone
      osc.gain.value = 1
      osc.connect(oscGainNode)
      osc.start()
    }
  }
  else if (tone && oscActive[tone] && !monosynth){
    oscActive[tone].gain.value = 1
  }
}

function stopTone (tone) {
  if (oscActive[tone]) {
    if (monosynth) {
      delete oscActive[tone]
      let idx = oscList.indexOf(tone)
      oscList.splice(idx, 1)
      if (oscList.length === 0) {
        gainNode.gain.value = 0
      }
      else {
        osc.frequency.value = oscList[oscList.length - 1]
      }
    }
    else {
      oscActive[tone].gain.value = 0
    }
  }
}
