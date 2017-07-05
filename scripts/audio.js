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
// let osc = context.createOscillator()
let gainNode = context.createGain()
let muted = true
// let oscList = []
let oscActive = {}

gainNode.connect(context.destination)
// osc.connect(gainNode)
// osc.start()



function playTone (tone) {
  if (tone && !oscActive[tone]){
    // oscActive[tone] = true
    // oscList.push(tone)
    oscActive[tone] = context.createOscillator()
    let osc = oscActive[tone]
    // osc.frequency.value = oscList[oscList.length - 1]
    osc.frequency.value = tone
    muted = false
    // gainNode.connect(context.destination)
    // osc.connect(gainNode)
    osc.connect(gainNode)
    osc.start()
  }
  else if (tone && oscActive[tone]){
    oscActive[tone].connect(gainNode)
  }
}

function stopTone (tone) {
  if (oscActive[tone]) {
    oscActive[tone].disconnect(gainNode)
    // delete oscActive[tone]
    // let idx = oscList.indexOf(tone)
    // oscList.splice(idx, 1)
    // if (oscList.length === 0) {
    //   muted = true
    //   gainNode.disconnect(context.destination)
    //   osc.disconnect(gainNode)
    // }
    // else {
    //   osc.frequency.value = oscList[oscList.length - 1]
    // }
  }
}
