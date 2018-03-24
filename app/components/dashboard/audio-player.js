const yo = require('buoyancy/html')
const css = require('sheetify')
const onload = require('on-load')
const bFavs = require('./favorites-button')
const {empty} = require('../../utils')
const {ACTIONS} = require('../../actions')
const prefix = css`
  :host {
    z-index: 99;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background-color: rgba(0, 0, 0, .8);
    color: #cccccc;
  }
`
module.exports = function (data, actionsUp) {
  return empty(data, () => yo`
    <div class=${prefix}>
      <div class="media">
        <figure class="media-left">
          <p>
            <img src=${data._.image} />
          </p>
        </figure>
        <div class="media-content">
          ${audio(data._.audio, e => actionsUp(ACTIONS.findNextTrack, +1))}
          <div class="content">
            <p>
              <strong>
                <a
                  target="_blank"
                  rel="norefeffer noopener"
                  href=${data._.shareurl}
                >
                  ${data._.name}
                </a>
              </strong>
              <br />
              <span>(via ${data._.album_name || 'single'})</span>
              <br />
              <span>${data._.artist_name}</span>
            </p>
          </div>
          <div class="level">
            <div class="level-left">
              <div class="buttons">
                ${bFavs(data.favs, data._, actionsUp)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `)
}

function audio (src, onended) {
  const p = yo`
    <audio
      controls
      preload="metadata"
      src=${src}
      onended=${e => {
        e.stopPropagation()
        onended(e)
      }}
    >
      <p>:(</p>
    </audio>
  `
  onload(p, p => p.play(), p => {
    p.removeAttribute('src')
    p.load()
  })
  return p
}
