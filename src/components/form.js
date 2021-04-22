export default class Form {
  constructor (params) {
    this.baseElement = params.baseElement
  }

  acceptValueAction ($modal) {
    $modal.remove()
    this.input($modal).value = $modal.dataset.suggestedValue
  }

  declineValueAction ($modal) {
    $modal.remove()
  }

  input ($modal) {
    return this.baseElement.querySelector(`#${$modal.dataset.parentInput}`)
  }

  registerActions () {
    this.baseElement.addEventListener('click', event => {
      const $modal = event.target.closest('.sa-modal') // maybe not reliable enough
      if ($modal) {
        const $button = event.target.closest('button')
        if ($button && $button.classList.contains('sa-modal__button')) {
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
      }
    })
  }
}
