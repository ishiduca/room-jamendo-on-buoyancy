const xtend = require('xtend')
module.exports.ACTIONS = xtend(
  wrap({
    onSearchFormInputInput: null,
    onSearchFormSelectChange: null,
    onSearchFormSubmit: null
  }, 'searchForm'),
  wrap({
    setSearchResultTitle: null,
    setSearchResultList: null,
    onPushTrackToPlaylist: null,
    onRemoveTrackFromPlaylist: null,
    applyFavsToTrackForSearchResult: null,
    applyUnFavsToTrackForSearchResult: null
  }, 'searchResult'),
  wrap({
    getTracksOnPlaylist: null,
    shufflePlaylist: null,
    toggleRepeat: null,
    selectNextTrack: null,
    findNextTrack: null,
    pushTrackToPlaylist: null,
    prePushTrackToPlaylist: null,
    removeTrackFromPlaylist: null,
    preRemoveTrackFromPlaylist: null,
    focusPlaylist: null,
    applyFavsToTrackForPlaylist: null,
    applyUnFavsToTrackForPlaylist: null
  }, 'playlist'),
  wrap({
    clearNowOnPlaying: null,
    setNowOnPlaying: null,
    applyFavsToTrackForAudioPlayer: null,
    applyUnFavsToTrackForAudioPlayer: null
  }, 'audioPlayer'),
  wrap({
    showHistories: null,
    hideHistories: null,
    putHistory: null,
    importHistoryToSearchResult: null
  }, 'histories'),
  wrap({
    wsFavoritesGetTracks: null,
    wsFavoritesIsFavorites: null,
    wsFavoritesRemoveTrack: null,
    wsFavoritesPutTrack: null
  }, 'ws'),
  wrap({
    errors: null
  }, 'errors')
)
function wrap (o, ns) {
  return Object.keys(o).reduce((x, n) => ((x[n] = `${ns}:${n}`) && x), {})
}
