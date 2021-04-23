export default class Mapper {
  constructor (params) {
    this.inputLabelTuples = params.inputLabelTuples
    this.fillData = params.fillData
    this.initDictionary()
  }

  initDictionary () {
    this.dictionary = {
      country: 'country_name',
      countryName: 'country_name',
      fullName: 'fn',
      fullname: 'fn',
      name: 'fn',
      affiliation: 'organization_name',
      organisation: 'organization_name',
      organization: 'organization_name',
      organisationName: 'organization_name',
      organizationName: 'organization_name',
      institution: 'organization_name',
      organizationTitle: 'role',
      position: 'role',
      job: 'role'
    }
  }

  toCamelCase (word) {
    return word.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2, offset) => {
      if (p2) return p2.toUpperCase()
      return p1.toLowerCase()
    })
  }

  checkValuesInDictionary (values) {
    const key = values.find(value => {
      const vl = this.toCamelCase(value)
      return this.dictionary[vl]
    })
    return this.dictionary[key]
  }

  fromAutocompleteAttribute ($input) {
    const autocompleteValues = $input.autocomplete.split(' ')
    return this.checkValuesInDictionary(autocompleteValues)
  }

  fromId ($input) {
    const ids = $input.id.split(' ')
    return this.checkValuesInDictionary(ids)
  }

  fromLabelText ($label) {
    if ($label) {
      const textContent = $label.textContent.trim()
      const textContentCamelCased = this.toCamelCase(textContent)
      const hit = this.dictionary[textContentCamelCased]
      if (hit) return hit

      const textContentSplit = textContent.split(' ')
      return this.checkValuesInDictionary(textContentSplit)
    }
    return null
  }

  map () {
    const elements = []
    this.inputLabelTuples.forEach(inputLabelTuple => {
      const $input = inputLabelTuple.input
      const $label = inputLabelTuple.label

      const fillKeyFromAutocompleteAttribute = this.fromAutocompleteAttribute($input)
      if (fillKeyFromAutocompleteAttribute) {
        elements.push({ input: $input, predicate: fillKeyFromAutocompleteAttribute })
        return
      }

      const fillKeyFromId = this.fromId($input)
      if (fillKeyFromId) {
        elements.push({ input: $input, predicate: fillKeyFromId })
        return
      }

      const fillKeyFromLabelText = this.fromLabelText($label)
      if (fillKeyFromLabelText) {
        elements.push({ input: $input, predicate: fillKeyFromLabelText })
      }
    })

    return elements
  }
}
