export default class Picker {
  constructor (params) {
    this.baseElement = params.form
  }

  pick () {
    const inputLabelTuples = []
    const inputs = this.baseElement.querySelectorAll('input')

    for (let i = 0; i < inputs.length; i++) {
      const $input = inputs[i]
      const $label = this.baseElement.querySelector(`label[for='${$input.id}']`)
      // const inputId = this.toCamelCase($input.id)
      inputLabelTuples.push({ input: $input, label: $label })
      // this.filler($input, inputId)
    }

    return inputLabelTuples
  }
}
