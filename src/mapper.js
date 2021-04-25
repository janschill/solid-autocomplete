import { dictionary } from './dictionary'

export default class Mapper {
  constructor (params) {
    this.inputLabelTuples = params.inputLabelTuples
    this.data = params.data
  }

  toCamelCase (word) {
    if (word) {
      return word.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2, offset) => {
        if (p2) return p2.toUpperCase()
        return p1.toLowerCase()
      })
    }
    return word
  }

  checkValuesInDictionary (values) {
    const key = values.find(value => {
      const vl = this.toCamelCase(value)
      return dictionary[vl]
    })
    return dictionary[this.toCamelCase(key)]
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
      const hit = dictionary[textContentCamelCased]
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
