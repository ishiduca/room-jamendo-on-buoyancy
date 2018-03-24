const {through, pipe} = require('mississippi')
const xtend = require('xtend')

module.exports = function (opt) {
  const db = opt.storage

  return {
    putTrack (id, track) {
      const s = through.obj()
      db.track.put(id, track, err => {
        if (err) s.emit('error', err)
        else s.end({key: id, value: track})
      })
      return s
    },
    removeTrack (id) {
      const s = through.obj()
      db.track.get(id, (err, track) => {
        if (err && !err.notFound) return s.emit('error', err)
        db.track.del(id, err => {
          if (err) s.emit('error', err)
          else s.end({key: id, value: track || null})
        })
      })
      return s
    },
    getTracks (opt) {
      const tracks = []
      const s = through.obj()
      pipe(
        db.track.createReadStream(),
        through.obj((p, _, done) => {
          tracks.push(p)
          done()
        }),
        err => {
          if (err) s.emit('error', err)
          else s.end({tracks})
        }
      )
      return s
    },
    isFavorites (tracks) {
      const s = through.obj()
      Promise.all(tracks.map(track => new Promise((resolve, reject) => {
        db.track.get(track.id, (err, t) => {
          if (err && !err.notFound) reject(err)
          else resolve({[track.id]: !err})
        })
      })))
        .then(tracks => s.end(xtend.apply(null, tracks)))
        .catch(err => s.emit('error', err))
      return s
    }
  }
}
