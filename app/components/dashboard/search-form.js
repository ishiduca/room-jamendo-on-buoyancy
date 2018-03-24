const yo = require('buoyancy/html')
const {ACTIONS} = require('../../actions')
module.exports = function (data, actionsUp) {
  return yo`
    <div>
      <form onsubmit=${onsubmit}>
        <div class="field has-addons">
          <div class="control select">
            <select
              required
              onchange=${onchange}
            >
              ${data.select.map(opt => (
                opt.selected
                  ? yo`<option value=${opt.value} selected>${opt.text}</option>`
                  : yo`<option value=${opt.value}>${opt.text}</option>`
              ))}
            </select>
          </div>
          <div class="control">
            <input
              class="input"
              type="text"
              autofocus
              required
              placeholder=${data.input.placeholder}
              value=${data.input.value}
              oninput=${oninput}
            />
          </div>
        </div>
      </form>
    </div>
  `
  function onsubmit (e) {
    e.preventDefault()
    actionsUp(ACTIONS.onSearchFormSubmit)
  }
  function oninput (e) {
    e.stopPropagation()
    actionsUp(ACTIONS.onSearchFormInputInput, e.target.value)
  }
  function onchange (e) {
    e.stopPropagation()
    actionsUp(ACTIONS.onSearchFormSelectChange, e.target.selectedIndex)
  }
}
