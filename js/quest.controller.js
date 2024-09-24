'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(onInit)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.btn-restart').click(onRestartGame)
$('.quest').hide()
$('.new-quest').hide()
$('.win').hide()

function onInit() {
  createQuestsTree()
}

function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide()
  $('.win').hide()

  renderQuest()
  // DONE: show the quest section
  $('.quest').show()
  $('.genie').show()
}

function renderQuest() {
  // DONE: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(gCurrQuest.txt)
}

function onUserResponse(ev) {
  // console.log('ev', ev)
  var res = ev.data.ans

  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // DONE: improve UX
      $('.quest').hide()
      $('.genie').hide()
      $('.win').show()
    } else {
      // DONE: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // DONE: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  // DONE: Get the inputs' values
  if (!newGuess || !newQuest) {
    throw new Error('Add text')
  }

  // DONE: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.win').hide()
  $('.game-start').show()
  $('.genie').show()
  gLastRes = null
  gCurrQuest = gQuestsTree
}

