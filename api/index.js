const storageApi = require('./storage')
const {through} = require('mississippi')

module.exports = function (opt, config) {
  const {putTrack, removeTrack, getTracks, isFavorites} = storageApi(opt)

  return {
    putTrack (p) {
      return putTrack(p.id, p)
    },
    removeTrack (p) {
      return removeTrack(p.id).pipe(log())
    },
    getTracks (p) {
      return getTracks(p).pipe(log())
    },
    isFavorites (p) {
      return isFavorites(p.tracks).pipe(log())
    }
  }
}

function log () {
  return through.obj((d, _, done) => {
    console.log(d)
    done(null, d)
  })
}
