export default class Mapper {
  constructor (params) {
    this.initDictionary()
  }

  initDictionary () {
    this.dictionary = {
      country: 'countryName',
      countryName: 'countryName',
      affiliation: 'organizationName',
      organisation: 'organizationName',
      organization: 'organizationName',
      organisationName: 'organizationName',
      organizationName: 'organizationName',
      institution: 'organizationName',
      organizationTitle: 'role',
      position: 'role',
      job: 'role',
      fullName: 'name',
      fullname: 'name',
      name: 'name'
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
    const textContent = $label.textContent
    const textContentCamelCased = this.toCamelCase(textContent)
    const hit = this.dictionary[textContentCamelCased]
    if (hit) return hit

    const textContentSplit = textContent.split(' ')
    return this.checkValuesInDictionary(textContentSplit)
  }
}
