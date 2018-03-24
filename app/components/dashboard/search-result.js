const yo = require('buoyancy/html')
const css = require('sheetify')
const {ACTIONS} = require('../../actions')
const {empty} = require('../../utils')
const bFavs = require('./favorites-button')
const prefix = css`
  :host {
    padding-bottom: 260px;
  }
  :host .isSelected {
    background-color: #aaaaaa;
  }
`
module.exports = function (data, actionsUp) {
  return empty(data.title, () => yo`
    <div class=${prefix}>
      <header>
        <h3>${data.title}</h3>
      </header>
      <div class="columns is-multiline">
        ${data.list.map(wTrack => yo`
          <div class="column">
            <div class=${wTrack.selected ? 'box isSelected' : 'box'}>
              <figure class="image is-128x128">
                <a onclick=${e => {
                  e.stopPropagation()
                  actionsUp(ACTIONS.prePushTrackToPlaylist, wTrack)
                }}>
                  <img src=${wTrack._.image} />
                </a>
              </figure>
              <article>
                <div class="content">
                  <p>
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
                </div>
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      ${bFavs(wTrack.favs, wTrack._, actionsUp)}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        `)}
      </div>
    </div>
  `)
}
