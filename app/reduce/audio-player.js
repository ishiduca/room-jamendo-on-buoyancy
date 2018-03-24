const xtend = require('xtend')
const {ACTIONS} = require('../actions')

module.exports = {
  [ACTIONS.clearNowOnPlaying] (data, maybeNull, update) {
    update({audioPlayer: null})
  },
  [ACTIONS.setNowOnPlaying] (data, wTrack, update) {
    update({audioPlayer: wTrack})
  },
  [ACTIONS.applyFavsToTrackForAudioPlayer] (data, id, update) {
    if (data.audioPlayer == null || (id !== data.audioPlayer._.id)) return
    update({audioPlayer: xtend(data.audioPlayer, {favs: true})})
  },
  [ACTIONS.applyUnFavsToTrackForAudioPlayer] (data, id, update) {
    if (data.audioPlayer == null || (id !== data.audioPlayer._.id)) return
    update({audioPlayer: xtend(data.audioPlayer, {favs: false})})
  }
}
