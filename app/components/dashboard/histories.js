const yo = require('buoyancy/html')
const css = require('sheetify')
const {ACTIONS} = require('../../actions')
const {empty} = require('../../utils')
const prefix = css`
  :host {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, .8);
  }
`
module.exports = function (data, actionsUp) {
  return empty(data, () => yo`
    <div
      class=${prefix}
      onclick=${e => {
        e.stopPropagation()
        actionsUp(ACTIONS.hideHistories)
      }}
    >
      <div class="buttons">
        ${data.map(h => yo`
          <a
            class="button"
            onclick=${e => actionsUp(ACTIONS.importHistoryToSearchResult, h)}
          >
            ${h.title}
          </a>
        `)}
      </div>
    </div>
  `)
}
