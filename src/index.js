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
        const fillData = await DataFetcher.fetchWebIdProfile(url)

      // pick form
      // find inputs to fill
      // fetch data from pod
      // map inputs to data
      // fill in data to inputs
    })
  }
}

if (process.env.NODE_ENV !== 'production') {
  window.SolidAutocomplete = SolidAutocomplete
}
