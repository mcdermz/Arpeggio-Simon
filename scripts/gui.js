$(document).on('load', function () {
  reset();
});

$('#start-btn').on('click', startButton);

$(document).on('keypress', function (e){
  if (e.which === 13 && $('#start-btn').hasClass('scale-in')) startButton();
})

$('#hint-btn').on('click', hintButton);

$('.game-gui').on('mousedown', '.col', mousedownGUI);

$('.game-gui').on('mouseup', '.col', mouseupGUI);

$('body').on('keydown keyup', function (e) {
  hotKeysPress(e);
});

$('body').on('keyup', function (e) {
  if (gameVars.userGuess) {
    hotKeysUp(e);
    startUserPattern();
  }
  recordToPattern(keyAction[e.which]);
});

let keyAction = {
  81: '1',
  87: '2',
  69: '3',
  82: '4',
  84: '5',
};

let oscList = []
let oscActive = {}

function startButton() {
  reset();
  gameVars.isPlaying = true;
  startPlayback(0);
  $('#hint-btn')
    .text('hints left: 2')
    .removeClass('scale-out')
    .addClass('scale-in');
  $('#start-btn')
    .addClass('scale-out')
    .removeClass('scale-in');
}

function hintButton() {
  startPlayback(0);
  gameVars.userPattern = [];
  gameVars.hints--;
  $('#hint-btn').text('hints left: ' + gameVars.hints);
  if (gameVars.hints <= 0) {
    $('#hint-btn')
      .removeClass('scale-in')
      .addClass('scale-out');
  }
}

function startBoxAction($box) {
  const tone = toneObject[$box.attr('id')]
  if (tone && !oscActive[tone]){
    oscActive[tone] = true
    oscList.push(tone)
    playTone(tone)
  }
  $box.addClass('lighten-5 clicked');
}

function endBoxAction($box) {
  const tone = toneObject[$box.attr('id')]
  if (oscActive[tone]) {
    let idx = oscList.indexOf(tone)
    delete oscActive[tone]
    oscList.splice(idx, 1)
  }
  $box.removeClass('lighten-5 clicked');
  stopTone();
}

function mousedownGUI () {
  if (gameVars.uI) {
    startBoxAction($(this));
    if ($(this).hasClass('clicked')) {
      $(this).mouseleave(function () {
        endBoxAction($(this))
      });
    }
  }
}

function mouseupGUI () {
  let $boxNum = $(this).attr('id');
  if (gameVars.uI && $(this).hasClass('clicked')) {
    endBoxAction($(this))
  }
  if (gameVars.userGuess && $boxNum !== undefined) {
    gameVars.userPattern.push($boxNum);
    startUserPattern();
  }
}

function hotKeysUp(e) {
  let keyID = keyAction[e.which];
  if (typeof keyID != 'undefined' && gameVars.uI) {
    gameVars.userPattern.push(keyID);
  }
}

function hotKeysPress(e) {
  let boxNum = keyAction[e.which]
  let boxID = '#' + boxNum;
  if (gameVars.uI) {
    if (e.type === 'keydown' && boxNum !== undefined) {
      startBoxAction($(boxID))
    } else if (boxNum !== undefined) {
      endBoxAction($(boxID))
    }
  }
}
