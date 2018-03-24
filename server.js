'use strict'
const path = require('path')
const http = require('http')
const levelup = require('levelup')
const leveldown = require('leveldown')
const encode = require('encoding-down')
const ecstatic = require('ecstatic')(path.join(__dirname, 'static'))
const websocket = require('websocket-stream')
const r = new (require('router-on-websocket-stream'))()
const valid = require('./lib/valid')
const dbPath = path.join(__dirname, 'dbs')
const storage = {
  track: levelup(encode(leveldown(dbPath), {valueEncoding: 'json'}))
}
const schemas = {
  putTrack: require('./schemas/put-track'),
  removeTrack: require('./schemas/remove-track'),
  isFavorites: require('./schemas/is-favorites')
}
const api = require('./api')({storage})
const app = http.createServer(ecstatic)

r.add('putTrack', valid(schemas.putTrack, api.putTrack))
r.add('removeTrack', valid(schemas.removeTrack, api.removeTrack))
r.add('getTracks', api.getTracks)
r.add('isFavorites', valid(schemas.isFavorites, api.isFavorites))

websocket.createServer({server: app}, dup => (
  dup.on('error', console.error.bind(console)).pipe(r.route()).pipe(dup)
))

module.exports = app
