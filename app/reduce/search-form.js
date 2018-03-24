const xtend = require('xtend')
const {ACTIONS} = require('../actions')
module.exports = {
  [ACTIONS.onSearchFormInputInput] (data, action, update) {
    update({
      searchForm: xtend(data.searchForm, {
        input: xtend(data.searchForm.input, {value: action})
      })
    })
  },
  [ACTIONS.onSearchFormSelectChange] (data, action, update) {
    update({
      searchForm: xtend(data.searchForm, {
        select: data.searchForm.select.map((o, i) => {
          if (i === action) return xtend(o, {selected: 'selected'})
          delete o.selected
          return o
        })
      })
    })
  }
}
