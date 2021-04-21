export default class Filler {
  constructor (params) {
    this.data = params.data
    this.tuples = params.tuples
  }

  fill () {
    this.tuples.forEach(tuple => {
      const $input = tuple.input
      const predicate = tuple.predicate
      $input.value = this.data[predicate]
    })
  }
}
