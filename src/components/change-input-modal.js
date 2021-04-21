export default class ChangeInputModal {
  constructor (params) {
    this.baseElement = params.baseElement
    this.input = params.input
    this.value = params.value
  }

  acceptValueAction () {
    console.log('acceptValue')
  }

  declineValueAction () {
    console.log('declineValue')
  }

  registerActions () {
    this.baseElement.addEventListener('click', event => {
      const $button = event.target.closest('button')
      if ($button.classList.contains('sc-modal__button')) {
        const action = event.target.dataset.action

        switch (action) {
          case 'accept':
            this.acceptValueAction()
            break
          case 'decline':
            this.declineValueAction()
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
