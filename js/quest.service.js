'use strict'
const QUESTS_KEY = 'quest'
var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  const storedTree = loadFromStorage(QUESTS_KEY)
  if (storedTree) {
    gQuestsTree = storedTree
  } else {
  gQuestsTree = createQuest('Male?')
  gQuestsTree.yes = createQuest('Gandhi')
  gQuestsTree.no = createQuest('Rita')
  }
  gCurrQuest = gQuestsTree
  
  gPrevQuest = null
  saveToStorage(QUESTS_KEY, gQuestsTree)
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // DONE: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  if (res === 'yes') {
    gCurrQuest = gCurrQuest.yes
  } else {
    gCurrQuest = gCurrQuest.no
  }
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // DONE: Create and Connect the 2 Quests to the quetsions tree
  var newQuest = createQuest(newQuestTxt)
  var newGuess =createQuest(newGuessTxt)
  newQuest.yes = newGuess
  newQuest.no = gCurrQuest
  gPrevQuest[lastRes] = newQuest
  saveToStorage(QUESTS_KEY, gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}
