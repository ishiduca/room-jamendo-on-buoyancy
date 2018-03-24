const xtend = require('xtend')
const shuffle = require('array-shuffle')
const {ACTIONS} = require('../actions')

module.exports = {
  [ACTIONS.shufflePlaylist] (data, action, update) {
    update({playlist: xtend(data.playlist, {list: shuffle(data.playlist.list)})})
  },
  [ACTIONS.toggleRepeat] (data, maybeNull, update) {
    update({playlist: xtend(data.playlist, {repeat: !data.playlist.repeat})})
  },
  [ACTIONS.pushTrackToPlaylist] (data, wTrack, update) {
    update({
      playlist: xtend(data.playlist, {
        list: data.playlist.list.concat(wTrack)
      })
    })
  },
  [ACTIONS.removeTrackFromPlaylist] (data, id, update) {
    update({
      playlist: xtend(data.playlist, {
        list: data.playlist.list.filter(w => w._.id !== id)
      })
    })
  },
  [ACTIONS.focusPlaylist] (data, wTrack, update) {
    update({
      playlist: xtend(data.playlist, {
        list: data.playlist.list.map(w => (
          w._.id === wTrack._.id ? xtend(w, {focus: true}) : xtend(w, {focus: null})
        ))
      })
    })
  },
  [ACTIONS.applyFavsToTrackForPlaylist] (data, id, update) {
    update({
      playlist: xtend(data.playlist, {
        list: data.playlist.list.map(w => (
          w._.id === id ? xtend(w, {favs: true}) : w
        ))
      })
    })
  },
  [ACTIONS.applyUnFavsToTrackForPlaylist] (data, id, update) {
    update({
      playlist: xtend(data.playlist, {
        list: data.playlist.list.map(w => (
          w._.id === id ? xtend(w, {favs: false}) : w
        ))
      })
    })
  }
}
