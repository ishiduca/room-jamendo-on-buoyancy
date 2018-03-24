module.exports = function () {
  return emitter => {
    emitter.on('*', function (...args) {
      console.log(this.event)
      args.forEach(a => console.log(a))
    })
  }
}
