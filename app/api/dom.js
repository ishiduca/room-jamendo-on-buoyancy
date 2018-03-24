const d = require('global/document')
const Combokeys = require('combokeys')
const {ACTIONS} = require('../actions')

module.exports = function () {
  return (emitter, getData) => {
    const DOCUMENT_TITLE = d.title
    const c = new Combokeys(d.documentElement)

    emitter.once('DOMContentLoaded', e => {
      emitter.emit(ACTIONS.wsFavoritesGetTracks)
    })

    emitter.on(ACTIONS.clearNowOnPlaying, () => {
      d.title = DOCUMENT_TITLE
    })

    emitter.on(ACTIONS.setNowOnPlaying, wTrack => {
      d.title = `${wTrack._.name} | ${wTrack._.artist_name}`
    })

    c.bind('p', () => {
      const p = d.querySelector('audio')
      if (p) p.paused ? p.play() : p.pause()
    })
    c.bind('r', () => emitter.emit(ACTIONS.toggleRepeat))
    c.bind('j', () => emitter.emit(ACTIONS.findNextTrack, +1))
    c.bind('k', () => emitter.emit(ACTIONS.findNextTrack, -1))
    c.bind('s', () => emitter.emit(ACTIONS.shufflePlaylist))
    c.bind('h', () => {
      getData().histories
        ? emitter.emit(ACTIONS.hideHistories)
        : emitter.emit(ACTIONS.showHistories)
    })
    c.bind('f', () => d.querySelector('input[type="text"]').focus())
  }
}
