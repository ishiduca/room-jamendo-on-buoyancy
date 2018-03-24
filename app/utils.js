var isEmpty = require('is-empty')
var d = require('global/document')
module.exports.empty = function empty (data, f) {
  return (isEmpty(data)) ? d.createTextNode('') : f()
}
