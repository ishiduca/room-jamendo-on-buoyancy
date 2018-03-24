const inject = require('reconnect-core')
const websocket = require('websocket-stream')
const router = require('router-on-websocket-stream')
const xtend = require('xtend')
const {ACTIONS} = require('../actions')

module.exports = function (config) {
  return (emitter, getData) => {
    const r = router()
    const reconnect = inject(uri => websocket(uri))
    const re = reconnect({}, ws => {
      ws.once('close', () => console.log('ws closed'))
      ws.once('end', () => {
        r.unpipe(ws)
        ws.unpipe(r)
        console.log('ws ended')
      })
      r.pipe(ws).pipe(r, {end: false})
    })
    re.on('error', err => console.error(err))
    re.on('connect', () => console.log(`connected - "${config.uri}"`))
    re.on('reconnect', (n, delay) => console.log(`recon ${n}, delay ${delay}`))

    const isFavorites = r.method('isFavorites')
    const getTracks = r.method('getTracks')
    const putTrack = r.method('putTrack')
    const removeTrack = r.method('removeTrack')

    onErrors(
      isFavorites,
      getTracks,
      putTrack,
      removeTrack
    )

    emitter.on(ACTIONS.wsFavoritesIsFavorites, trackIds => {
      isFavorites.write({tracks: trackIds})
    })
    isFavorites.on('data', trap(trackIds => {
//      if (trackIds.responseEnd) return
      const list = getData().searchResult.list.map(wTrack => (
        xtend(wTrack, {favs: !!trackIds[wTrack._.id]})
      ))
      emitter.emit(ACTIONS.setSearchResultList, list)
    }))

    emitter.on(ACTIONS.wsFavoritesGetTracks, () => {
      getTracks.write({getTracks: true})
    })
    getTracks.on('data', trap(ps => {
//      if (ps.responseEnd) return
      emitter.emit(ACTIONS.setSearchResultTitle, `favorites - ${ps.tracks.length}`)
      emitter.emit(ACTIONS.getTracksOnPlaylist, ps.tracks.map(p => ({
        _: p.value, selected: null, favs: true
      })))
    }))

    emitter.on(ACTIONS.wsFavoritesPutTrack, track => {
      putTrack.broadcast(track)
    })
    putTrack.on('data', trap(p => {
//      if (p.responseEnd) return
      emitter.emit(ACTIONS.applyFavsToTrackForSearchResult, p.key)
      emitter.emit(ACTIONS.applyFavsToTrackForPlaylist, p.key)
      emitter.emit(ACTIONS.applyFavsToTrackForAudioPlayer, p.key)
    }))
    emitter.on(ACTIONS.wsFavoritesRemoveTrack, track => {
      removeTrack.broadcast(track)
    })
    removeTrack.on('data', trap(p => {
//      if (p.responseEnd) return
      emitter.emit(ACTIONS.applyUnFavsToTrackForSearchResult, p.key)
      emitter.emit(ACTIONS.applyUnFavsToTrackForPlaylist, p.key)
      emitter.emit(ACTIONS.applyUnFavsToTrackForAudioPlayer, p.key)
    }))

    re.connect(config.uri)

    function trap (f) {
      return data => (data.responseEnd || f(data))
    }

    function onErrors (...s) {
      s.forEach(s => s.on('error', err => console.error(err)))
    }
  }
}
