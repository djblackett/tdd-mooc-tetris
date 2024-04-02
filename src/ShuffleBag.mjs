class ShuffleBag {
  blocks;

  constructor(blockArray) {
    this.blocks = blockArray;
    this.shuffle(this.blocks)
  }

  // todo - add seed?
  shuffle() {
    this.blocks = this.blocks
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }
}