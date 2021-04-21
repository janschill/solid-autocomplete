import './assets/css/styles.css'
import Filler from './filler'
import Mapper from './mapper'
import Picker from './picker'

export default class SolidAutocomplete {
  constructor (params) {
    this.autocompleteButton = params.button
    this.form = params.form
    this.picker = new Picker({ form: this.form })
    this.autocompleteButton.addEventListener('click', async () => {
      const fillData = {
        name: 'Jan Schill',
        countryName: 'Denmark',
        postalCode: '2300',
        region: 'Copenhagen',
        organizationName: 'IT University of Copenhagen',
        role: 'Student'
      }
      const inputLabelTuples = this.picker.pick()
      this.mapper = new Mapper({ inputLabelTuples })
      const inputsAndPredicates = this.mapper.map()
      this.filler = new Filler({ baseElement: this.form, tuples: inputsAndPredicates, data: fillData })
      this.filler.fill()

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
