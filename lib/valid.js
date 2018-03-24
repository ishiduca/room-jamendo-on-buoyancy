const valid = require('is-my-json-valid')

module.exports = function (schema, api) {
  return (params, req) => {
    const v = valid(schema)
    return (!v(params, {verbose: true}))
      ? Promise.reject(v.errors)
      : api(params, req)
  }
}
