const w = require('global/window')
const xtend = require('xtend')
const API_JAMENDO_COM_V3 = 'https://api.jamendo.com/v3.0'
const l = w.location
const uri = `${l.protocol.replace('http', 'ws')}//${l.host}`

module.exports = {
  xhr: {
    searchTracks: {
      uri: `${API_JAMENDO_COM_V3}/tracks`,
      defaultParams: xtend(require('../client_id'), {
        format: 'jsonpretty',
        limit: 'all',
        order: 'popularity_week',
        type: 'single albumtrack',
        audioformat: 'mp32'
      })
    }
  },
  ws: {
    uri: uri
  }
}
