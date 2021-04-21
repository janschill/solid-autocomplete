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
        const action = event.target.dataset.action

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
    // this.input.
  }

  template (text) {
    return `
      <div class="sa-modal">
        <p class="sa-modal__text">${text}</p>
        <button class="sc-modal__button sc-modal__button--accept" data-action="accept">Y</button>
        <button class="sc-modal__button sc-modal__button--decline" data-action="decline">X</button>
      </div>
    `
  }
}
