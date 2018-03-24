const buoyancy = require('buoyancy')
const xtend = require('xtend')
const app = buoyancy(require('./init'))
const d = require('global/document')
const css = require('sheetify')
const config = require('./config')

app.reduce(xtend(
  require('./reduce/search-form'),
  require('./reduce/search-result'),
  require('./reduce/playlist'),
  require('./reduce/audio-player'),
  require('./reduce/histories')
))

app.use(require('./api/logger')())
app.use(require('./api/dom')())
app.use(require('./api/xhr')(config.xhr))
app.use(require('./api/ws')(config.ws))

app.route('/', require('./components/dashboard'))
css('./components/css/bulma.css')
d.body.appendChild(app('/'))
