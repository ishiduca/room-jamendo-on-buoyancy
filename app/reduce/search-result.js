const xtend = require('xtend')
const {ACTIONS} = require('../actions')

module.exports = {
  [ACTIONS.setSearchResultTitle] (data, title, update) {
    update({
      searchResult: xtend(data.searchResult, {title: title})
    })
  },
  [ACTIONS.setSearchResultList] (data, list, update) {
    update({
      searchResult: xtend(data.searchResult, {list: list})
    })
  },
  [ACTIONS.onPushTrackToPlaylist] (data, id, update) {
    update({
      searchResult: xtend(data.searchResult, {
        list: data.searchResult.list.map(w => (
          w._.id === id ? xtend(w, {selected: true}) : w
        ))
      })
    })
  },
  [ACTIONS.onRemoveTrackFromPlaylist] (data, id, update) {
    update({
      searchResult: xtend(data.searchResult, {
        list: data.searchResult.list.map(w => (
          w._.id === id ? xtend(w, {selected: false}) : w
        ))
      })
    })
  },
  [ACTIONS.applyFavsToTrackForSearchResult] (data, id, update) {
    update({
      searchResult: xtend(data.searchResult, {
        list: data.searchResult.list.map(w => (
          w._.id === id ? xtend(w, {favs: true}) : w
        ))
      })
    })
  },
  [ACTIONS.applyUnFavsToTrackForSearchResult] (data, id, update) {
    update({
      searchResult: xtend(data.searchResult, {
        list: data.searchResult.list.map(w => (
          w._.id === id ? xtend(w, {favs: false}) : w
        ))
      })
    })
  }
}
