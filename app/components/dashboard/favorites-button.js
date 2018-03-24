const yo = require('buoyancy/html')
const {ACTIONS} = require('../../actions')

module.exports = function (favs, track, actionsUp) {
  if (favs == null) {
    return yo`
      <a class="button is-danger is-outlined" title="disabled button" disabled>disabled</a>
    `
  }

  return yo`
    <a
      class=${favs ? 'button is-danger' : 'button is-danger is-outlined'}
      onclick=${e => {
        e.stopPropagation()
        favs
          ? actionsUp(ACTIONS.wsFavoritesRemoveTrack, track)
          : actionsUp(ACTIONS.wsFavoritesPutTrack, track)
      }}
    >
      ${favs ? 'Favs' : 'put Favs'}
    </a>
  `
}
