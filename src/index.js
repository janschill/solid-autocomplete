import './assets/css/styles.css'
import Form from './components/form'
import DataFetcher from './data-fetcher'
import Filler from './filler'
import Mapper from './mapper'
import Picker from './picker'

export default class SolidAutocomplete {
  constructor (params) {
    this.autocompleteButton = params.button
    this.form = params.form

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
}

if (process.env.NODE_ENV !== 'production') {
  window.SolidAutocomplete = SolidAutocomplete
}
