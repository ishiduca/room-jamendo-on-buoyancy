module.exports = {
  type: 'object',
  required: true,
  properties: {
    tracks: {
      type: 'array',
      required: true,
      items: require('./remove-track')
    }
  }
}
