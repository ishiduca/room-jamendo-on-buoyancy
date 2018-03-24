// const xtend = require('xtend')
const {ACTIONS} = require('../actions')
const HISTORIES = []

function doesExists (_title) {
  const title = _title.toUpperCase()
  return HISTORIES.map(h => h.title.toUpperCase()).some(t => t === title)
}

module.exports = {
  [ACTIONS.putHistory] (data, history, update) {
    if (doesExists(history.title)) return console.warn('! same history is exists in histories.')

    HISTORIES.push(history)
    if (history != null) update({history: HISTORIES})
  },
  [ACTIONS.showHistories] (data, _, update) {
    if (HISTORIES.length === 0) return console.warn('no histories')
    update({histories: HISTORIES})
  },
  [ACTIONS.hideHistories] (data, _, update) {
    update({histories: null})
  }
}
