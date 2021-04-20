const webIdProfileDocument = {
  name: 'Jan Schill',
  countryName: 'Denmark',
  postalCode: '2300',
  region: 'Copenhagen',
  organizationName: 'IT University of Copenhagen',
  role: 'Student'
}

export default class SolidAutocomplete {
  constructor (params) {
    this.autocompleteButton = params.button
    this.form = params.form

    this.autocompleteButton.addEventListener('click', () => {
      this.picker()
    })
  }

  toCamelCase (word) {
    return word.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2, offset) => {
      if (p2) return p2.toUpperCase()
      return p1.toLowerCase()
    })
  }

  picker () {
    const $inputs = this.form.querySelectorAll('input')
    for (let i = 0; i < $inputs.length; i++) {
      const $input = $inputs[i]
      const inputId = this.toCamelCase($input.id)
      this.filler($input, inputId)
    }
  }

  filler ($element, inputId) {
    const fillValue = webIdProfileDocument[inputId]
    if (fillValue) $element.value = fillValue
  }
}

if (process.env.NODE_ENV !== 'production') {
  window.SolidAutocomplete = SolidAutocomplete
}
