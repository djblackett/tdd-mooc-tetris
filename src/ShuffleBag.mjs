class ShuffleBag {
  blocks;
  constructor(blockArray) {
    this.blocks = blockArray;
  }
  shuffle() {
    this.blocks = this.blocks.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
  }
}