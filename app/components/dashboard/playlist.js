const yo = require('buoyancy/html')
const css = require('sheetify')
const bFavs = require('./favorites-button')
const {ACTIONS} = require('../../actions')
const prefix = css`
  :host {}
  :host ul { 
    height: 252px;
    overflow-y: auto;
  }
  :host .list {
    list-style-type: none;
  }
  :host .isFocused {
    background-color: #ffaa00;
  }
  :host .wrapFavsButton {
    padding: 12px;
  }
`
module.exports = function (data, actionsUp) {
  return yo`
    <div class=${prefix}>
      <nav class="navbar">
        <div class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item">
              <h3>playlist</h3>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped is-grouped-multiline">
                ${b('shuffle', e => actionsUp(ACTIONS.shufflePlaylist))}
                ${b('prev', e => actionsUp(ACTIONS.findNextTrack, -1))}
                ${b('next', e => actionsUp(ACTIONS.findNextTrack, +1))}
                ${checkbox(data.repeat, e => actionsUp(ACTIONS.toggleRepeat))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <ul>
          ${data.list.map(wTrack => yo`
            <li class=${wTrack.focus ? 'list isFocused' : 'list'}>
              <div class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <a onclick=${e => {
                      e.stopPropagation()
                      actionsUp(ACTIONS.selectNextTrack, wTrack)
                    }}>
                      <img src=${wTrack._.image} />
                    </a>
                  </p>
                </figure>
                <div class="media-content">
                  <p class="content">
                    <strong>
                      <a
                        href=${wTrack._.shareurl}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        ${wTrack._.name}
                      </a>
                    </strong>
                    (via ${wTrack._.album_name || 'single'})
                    <br />
                    ${wTrack._.artist_name}
                  </p>
                  <div class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <a class="button" onclick=${e => {
                          e.stopPropagation()
                          actionsUp(ACTIONS.preRemoveTrackFromPlaylist, wTrack)
                        }}>x</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="media-right">
                  <div class="wrapFavsButton">
                    ${bFavs(wTrack.favs, wTrack._, actionsUp)}
                  </div>
                </div>
              </div>
            </li>
          `)}
        </ul>
      </div>
    </div>
  `
}

function checkbox (repeat, onchange) {
  const check = yo`<input type="checkbox" onchange=${e => {
    e.stopPropagation()
    onchange(e)
  }} />`
  if (repeat) check.setAttribute('checked', 'checked')
  return yo`
    <div class="control">
      <label class="checkbox">
        ${check}
        repeat this track.
      </label>
    </div>
  `
}

function b (content, onclick) {
  return yo`
    <div class="control">
      <a class="button" onclick=${e => {
        e.stopPropagation()
        onclick(e)
      }}>
        ${content}
      </a>
    </div>
  `
}
