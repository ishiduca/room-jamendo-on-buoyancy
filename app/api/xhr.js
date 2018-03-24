const {ACTIONS} = require('../actions')
const {stringify} = require('querystring')
const {get} = require('jsonist')
const xtend = require('xtend')

module.exports = function (config) {
  return (emitter, getData) => {
    emitter.on(ACTIONS.onSearchFormSubmit, () => {
      const data = getData().searchForm
      const key = data.select.filter(o => o.selected)[0].value
      const val = data.input.value.split(' ').filter(Boolean).join(' ')
      const q = xtend(config.searchTracks.defaultParams, {[key]: val})
      const uri = `${config.searchTracks.uri}?${stringify(q)}`
      const title = `${key}:${val}`

      get(uri, hookError((data, res) => {
        emitter.emit(ACTIONS.putHistory, {
          title: title,
          list: data.results
        })
        emitter.emit(ACTIONS.wsFavoritesIsFavorites, data.results.map(t => ({id: t.id})))
        emitter.emit(ACTIONS.getTracksOnPlaylist, data.results.map(t => ({
          _: t, selected: null
        })))
      }))

      emitter.emit(ACTIONS.setSearchResultTitle, title)
    })

    emitter.on(ACTIONS.getTracksOnPlaylist, wTracks => {
      const m = getData().playlist.list.reduce((x, wTrack) => (
        (x[wTrack._.id] = true) && x
      ), {})
      emitter.emit(ACTIONS.setSearchResultList, wTracks.map(wTrack => (
        xtend(wTrack, {selected: !!m[wTrack._.id]})
      )))
    })

    emitter.on(ACTIONS.importHistoryToSearchResult, history => {
      emitter.emit(ACTIONS.setSearchResultTitle, history.title)
      emitter.emit(ACTIONS.wsFavoritesIsFavorites, history.list.map(t => ({id: t.id})))
      emitter.emit(ACTIONS.getTracksOnPlaylist, history.list.map(t => ({
        _: t, selected: null
      })))
    })

    emitter.on(ACTIONS.preRemoveTrackFromPlaylist, wTrack => {
      emitter.emit(ACTIONS.removeTrackFromPlaylist, wTrack._.id)
      emitter.emit(ACTIONS.onRemoveTrackFromPlaylist, wTrack._.id)
    })

    emitter.on(ACTIONS.prePushTrackToPlaylist, wTrack => {
      const list = getData().playlist.list
      if (list.some(w => w._.id === wTrack._.id)) {
        return console.warn('! same track is registered to the playlist')
      }

      emitter.emit(ACTIONS.pushTrackToPlaylist, {_: wTrack._, favs: wTrack.favs, focus: null})
      emitter.emit(ACTIONS.onPushTrackToPlaylist, wTrack._.id)
    })

    emitter.on(ACTIONS.selectNextTrack, wTrack => {
      setTimeout(() => emitter.emit(ACTIONS.setNowOnPlaying, wTrack), 10)
      emitter.emit(ACTIONS.clearNowOnPlaying)
      emitter.emit(ACTIONS.focusPlaylist, wTrack)
    })

    emitter.on(ACTIONS.findNextTrack, n => {
      n || (n = 1)
      const ps = getData().playlist
      const list = ps.list
      const repeat = ps.repeat

      if (list.length === 0) {
        emitter.emit(ACTIONS.clearNowOnPlaying)
        return console.warn('! not found a track in the playlist.')
      }

      var next
      list.some((wTrack, i) => {
        if (wTrack.focus) {
          next = repeat ? i : (i + n)
          return true
        }
      })

      if (next > list.length - 1) next = 0
      else if (next < 0) next = list.length - 1
      if (next == null) next = 0

      emitter.emit(ACTIONS.selectNextTrack, list[next])
    })

    function hookError (f) {
      return (err, data, res) => (
        (err || data.headers.code !== 0)
          ? errors(err || new Error(data.headers.error_message), res)
          : f(data, res)
      )
    }

    function errors (err) {
      emitter.emit('errors', err)
      Array.isArray(err)
        ? err.forEach(e => console.error(e))
        : console.error(err)
    }
  }
}
