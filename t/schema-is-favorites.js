var test = require('tape')
var valid = require('is-my-json-valid')
var schemas = {
  putTrack: require('../schemas/put-track'),
  removeTrack: require('../schemas/remove-track'),
  isFavorites: require('../schemas/is-favorites')
}

var json = require('./result')

test('', t => {
  var v = valid(schemas.putTrack)
  var data = json.results[0]
  t.ok(v(data, {verbose: true}))
  t.end()
})

test('', t => {
  var v = valid(schemas.removeTrack)
  var data = json.results[1]
  t.ok(v(data, {verbose: true}))
  t.end()
})

test('', t => {
  var v = valid(schemas.isFavorites)
  var data = {
    tracks: [
      {id: '12345', hoge: true},
      {id: '9876'}
    ]
  }
  t.ok(v(data, {verbose: true}))
  t.end()
})
