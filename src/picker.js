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
      inputLabelTuples.push({ input: $input, label: $label })
    }

    return inputLabelTuples
  }
}
