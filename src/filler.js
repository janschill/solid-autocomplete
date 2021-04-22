import ChangeInputModal from './components/change-input-modal'

export default class Filler {
  constructor (params) {
    this.baseElement = params.baseElement
    this.tuples = params.tuples
    this.data = params.data
  }

  hasRenderedModal ($input) {
    // An inputs nextSibling is its text
    const nextSibling = $input.nextSibling.nextSibling
    if (nextSibling) {
      return nextSibling.nodeName === 'DIV' && nextSibling.classList.contains('sa-modal')
    }
    return false
  }

  fill () {
    this.tuples.forEach(tuple => {
      const $input = tuple.input
      const predicate = tuple.predicate
      const value = this.data[predicate]
      if (value) {
        const currentInputValue = $input.value
        if (
          currentInputValue &&
          currentInputValue !== '' &&
          currentInputValue !== value
        ) {
          if (!this.hasRenderedModal($input)) {
            const changeInputModal = new ChangeInputModal(
              { baseElement: this.baseElement, input: $input, value: value }
            )
            changeInputModal.render()
          }
        } else {
          $input.value = value
        }
      }
    })
  }
}
