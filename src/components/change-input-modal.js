export default class ChangeInputModal {
  constructor (params) {
    this.baseElement = params.baseElement
    this.input = params.input
    this.value = params.value
  }

  render () {
    const $modal = document.createElement('div')
    $modal.classList.add('sa-modal')
    $modal.innerHTML = this.template(this.value)
    $modal.dataset.parentInput = this.input.id
    $modal.dataset.suggestedValue = this.value
    this.input.parentNode.appendChild($modal)
  }

  template (text) {
    return `
      <p class="sa-modal__text">${text}</p>
      <button class="sa-modal__button sa-modal__button--accept checkmark" data-action="accept">
        <span class="checkmark__circle"></span>
        <span class="checkmark__stem"></span>
        <span class="checkmark__kick"></span>
      </button>
      <button class="sa-modal__button sa-modal__button--decline" data-action="decline">
        <span class="close">
          <span class="close__inner"></span>
        </span>
      </button>
    `
  }
}
