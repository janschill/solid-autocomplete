import { VCARD } from '@inrupt/vocab-common-rdf'
import ChangeInputModal from './components/change-input-modal'

export default class Filler {
  constructor (params) {
    this.baseElement = params.baseElement
    this.tuples = params.tuples
    this.data = params.data
  }

  // Naive approach to handling names
  // Refactor to mapper, or different class
  // Hardcoded 'fn', 'first_name', 'last_name' is also not ideal
  handleName (predicate) {
    switch (predicate) {
      case 'first_name':
        return this.data[VCARD.fn.value].split(' ')[0]
      case 'last_name':
        return this.data[VCARD.fn.value].split(' ')[1]
      default:
        return null
    }
  }

  hasRenderedModal ($input) {
    const nextSibling = $input.nextSibling
    if (nextSibling) {
      return nextSibling.nodeName === 'DIV' &&
        nextSibling.classList.contains('sa-modal')
    }
    return false
  }

  fill () {
    this.tuples.forEach(tuple => {
      const $input = tuple.input
      const predicate = tuple.predicate
      const value = this.handleName(predicate) || this.data[predicate]
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
