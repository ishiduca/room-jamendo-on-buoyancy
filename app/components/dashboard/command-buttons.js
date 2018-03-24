const yo = require('buoyancy/html')
const {ACTIONS} = require('../../actions')
module.exports = function (maybeNull, actionsUp) {
  return yo`
    <div class="buttons">
      ${b('favorites', e => actionsUp(ACTIONS.wsFavoritesGetTracks))}
      ${b('histories', e => actionsUp(ACTIONS.showHistories))}
    </div>
  `
}

function b (c, f) {
  return yo`
    <a class="button" onclick=${e => {
      e.stopPropagation()
      f(e)
    }}>
      ${c}
    </a>
  `
}
