export default class ChangeInputModal {
  constructor (params) {
    this.baseElement = params.baseElement
    this.input = params.input
    this.value = params.value
    this.registerActions()
  }

  acceptValueAction ($modal) {
    $modal.remove()
    this.input.value = this.value
  }

  declineValueAction ($modal) {
    $modal.remove()
  }

  registerActions () {
    this.baseElement.addEventListener('click', event => {
      const $modal = event.target.closest('div') // maybe not reliable enough
      const $button = event.target.closest('button')
      if ($button.classList.contains('sc-modal__button')) {
        event.preventDefault()
        const action = $button.dataset.action

        switch (action) {
          case 'accept':
            this.acceptValueAction($modal)
            break
          case 'decline':
            this.declineValueAction($modal)
            break
          default:
            break
        }
      }
    })
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
      <button class="sc-modal__button sc-modal__button--accept checkmark" data-action="accept">
        <span class="checkmark__circle"></span>
        <span class="checkmark__stem"></span>
        <span class="checkmark__kick"></span>
      </button>
      <button class="sc-modal__button sc-modal__button--decline" data-action="decline">
        <span class="close">
          <span class="close__inner"></span>
        </span>
      </button>
    `
  }
}
