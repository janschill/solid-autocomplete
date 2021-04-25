import { VCARD } from '@inrupt/vocab-common-rdf'

export default class Mapper {
  constructor (params) {
    this.inputLabelTuples = params.inputLabelTuples
    this.data = params.data
    this.initDictionary()
  }

  initDictionary () {
    // The keys are getting camel-cased before
    // The keys are the fields we can detect from inputs
    // The values are the predicates used by @inrupt/vocab-common-rdf
    this.dictionary = {
      country: VCARD.country_name.value,
      countryName: VCARD.country_name.value,
      firstName: 'first_name',
      fName: 'first_name',
      givenName: 'first_name',
      lastName: 'last_name',
      lName: 'last_name',
      familyName: 'last_name',
      fullName: VCARD.fn.value,
      fullname: VCARD.fn.value,
      name: VCARD.fn.value,
      affiliation: VCARD.organization_name.value,
      organisation: VCARD.organization_name.value,
      organization: VCARD.organization_name.value,
      organisationName: VCARD.organization_name.value,
      organizationName: VCARD.organization_name.value,
      institution: VCARD.organization_name.value,
      organizationTitle: VCARD.role.value,
      position: VCARD.role.value,
      job: VCARD.role.value
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

  fromNameAttribute ($input) {
    const name = $input.name
    return this.checkValuesInDictionary([name])
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

      const fillKeyFromNameAttribute = this.fromNameAttribute($input)
      if (fillKeyFromNameAttribute) {
        elements.push({ input: $input, predicate: fillKeyFromNameAttribute })
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
