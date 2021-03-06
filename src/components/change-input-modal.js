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
    this.input.parentNode.insertBefore($modal, this.input.nextSibling)
  }

  template (text) {
    return `
      <p class="sa-modal__text">${text}</p>
      <button class="sa-modal__button sa-modal__button--accept" data-action="accept"></button>
      <button class="sa-modal__button sa-modal__button--decline" data-action="decline"></button>
    `
  }
}
