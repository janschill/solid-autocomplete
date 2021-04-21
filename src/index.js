import Filler from './filler'
import Mapper from './mapper'
import Picker from './picker'

export default class SolidAutocomplete {
  constructor (params) {
    this.autocompleteButton = params.button
    this.form = params.form
    this.picker = new Picker({ form: this.form })
    this.filler = new Filler()
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
      this.mapper = new Mapper({ inputLabelTuples, fillData })
      const mappedInputWithKeys = this.mapper.map()
      console.log(mappedInputWithKeys)
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
