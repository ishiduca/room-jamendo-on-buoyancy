const yo = require('buoyancy/html')
const commandButtons = require('./command-buttons')
const searchForm = require('./search-form')
const searchResult = require('./search-result')
const playlist = require('./playlist')
const audioPlayer = require('./audio-player')
const histories = require('./histories')

module.exports = function (data, p, u, actionsUp) {
  return yo`
    <section>
      <header class="level">
        <div class="level-left">
          <div class="level-item">
            ${searchForm(data.searchForm, actionsUp)}
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            ${commandButtons(null, actionsUp)}
          </div>
        </div>
      </header>
      ${playlist(data.playlist, actionsUp)}
      ${searchResult(data.searchResult, actionsUp)}
      ${audioPlayer(data.audioPlayer, actionsUp)}
      ${histories(data.histories, actionsUp)}
    </section>
  `
}
