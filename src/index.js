import './assets/css/styles.css'
import Form from './components/form'
import DataFetcher from './data-fetcher'
import Filler from './filler'
import Mapper from './mapper'
import Picker from './picker'
const packageJson = require('../package.json')

export default class SolidAutocomplete {
  constructor (params) {
    console.log(`SA: Version@${packageJson.version}`)

    this.form = (params && params.form) ? params.form : document.querySelector('form')
    if (params && params.button) this.button = params.button
  }

  setupSolidAutocomplete () {
    if (!this.autocompleteButton) this.autocompleteButton = document.querySelector('.sc-autocomplete')
    if (!this.autocompleteButton) this.autocompleteButton = this.createAutocompleteDomControls(this.form)

    this.picker = new Picker({ form: this.form })
    const form = new Form({ baseElement: this.form })
    form.registerActions()

    this.autocompleteButton.addEventListener('click', async event => {
      const url = this.grabResourceUrl()
      if (url) {
        this.autocompleteButton.disabled = true
        const fillData = await DataFetcher.fetchWebIdProfile(url)
        this.autocompleteButton.disabled = false

        const inputLabelTuples = this.picker.pick()
        this.mapper = new Mapper({ inputLabelTuples })
        const inputsAndPredicates = this.mapper.map()
        this.filler = new Filler({ baseElement: this.form, tuples: inputsAndPredicates, data: fillData })
        this.filler.fill()
      }
    })
  }

  grabResourceUrl () {
    return document.querySelector('#solid-resource-url').value
  }

  createAutocompleteDomControls ($parent = null) {
    if (!$parent) $parent = this.form
    if (!$parent) $parent = document.querySelector('body')

    const $container = document.createElement('div')
    $container.innerHTML = `
      <label for="solid-resource-url">Document to use for autofilling.</label>
      <input type="url" name="solid-resource-url" id="solid-resource-url" placeholder="https://janschill.net/profile/card#me">
      <button class="sc-autocomplete">Autocomplete</button>
    `
    $parent.insertBefore($container, $parent.firstChild)
  }
}

if (process.env.NODE_ENV !== 'production') {
  window.SolidAutocomplete = SolidAutocomplete
}
