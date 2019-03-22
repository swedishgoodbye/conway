/**
 * Implemention of a Box
 */

const MODULO = 5;
const CHANCE_TREE = 0.01;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Box class
 */
class Box {
  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.cells = [Array2D(width, height), Array2D(width, height)];

    this.currentBufferIndex = 0;

    this.randomize();

    // console.log('cells array', this.cells);

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid
   */
  clear() {}

  /**
   * Randomize the cca grid
   */
  randomize() {
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        // if(Math.random() < CHANCE_TREE) {
        // this.cells[this.currentBufferIndex][height][width] = 5;
        // }
        // else{
        this.cells[this.currentBufferIndex][height][width] =
          (Math.random() * 2) | 0;
        // }
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    function hasLife(row, col) {
      let lifeCount = 0;
      let hasVines = false;

      // Off Grid === Dead

      for (let rowOnset = 1; rowOnset >= -1; rowOnset--) {
        let rowPos = row + rowOnset;
        if (rowPos > 0 || rowPos === this.height) {
          continue;
        }
      }

      for (let rowOffset = 0; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;
        if (rowPos < 0 || rowPos === this.height) {
          continue;
        }

        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;

          if (colPos < 1 || colPos === this.width) {
            continue;
          }
          if (colOffset === 1 && rowOffset === 1) {
            continue;
          }
          // if(currentBuffer[rowPos][colPos] === 2){
          //   hasVines = true;
          // }
          if (currentBuffer[rowPos][colPos] === 2) {
            lifeCount++;
          }

          // if(rowPos === 200 && colPos === 150){
          //   // colPos--;
          //   lifeCount = 0;
          // }
          // if(currentBuffer[rowPos] === 50){
          //   continue;
          // }
          // if(rowPos === 100 && colPos === 200){
          //   // colPos--;
          //   continue;
          // }
          // if(currentBuffer[rowPos] === 120){
          //   continue;
          // }
          // if(rowPos === 105){
          //   // colPos--;
          //   lifeCount += .45;
          // }
          // if(colPos === 500){
          //   // colPos--;
          //   lifeCount += .35;
          // }
          // if(colPos === 200 && rowPos === 400){
          //   // colPos--;
          //   lifeCount += .35;
          // }
          if (rowPos < 300 && rowPos > 150 && colPos < 250 && colPos > 150) {
            // colPos--;
            lifeCount += 0.9;
          }
          if (rowPos < 250 && rowPos > 100 && colPos < 400 && colPos > 250) {
            // colPos--;
            lifeCount += 0.9;
          }
          if (rowPos < 250 && rowPos > 100 && colPos < 150 && colPos > 20) {
            // colPos--;
            lifeCount += 0.9;
          }
          if (rowPos < 300 && rowPos > 150 && colPos < 500 && colPos > 400) {
            // colPos--;
            lifeCount += 0.75;
          }

          // if(rowPos< 240 && rowPos >60 && colPos < 350 && colPos > 250){
          //   lifeCount += 1;
          // }

          if (rowPos < 70 && rowPos > 50 && colPos < 650 && colPos > 0) {
            // colPos--;
            lifeCount += 0;
          }

          // if (rowPos === 200 && colPos === 300){
          //   lifeCount += .785;
          // }
          // if(colPos === 400){
          //   // colPos--;
          //   lifeCount += .35;
          // }
          // if(colPos === 200){
          //   // colPos--;
          //   lifeCount += .35;
          // }
          // if(colPos === 100){
          //   // colPos--;
          //   lifeCount += .31;
          // }
          // if(rowPos === 340){
          //   // colPos--;
          //   lifeCount += .55;
          // }
          // if(rowPos === 250){
          //   // colPos--;
          //   lifeCount = 0;
          // }
          // if(rowPos === 300){
          //   // colPos--;
          //   continue;
          // }

          // if(hasVines === true){
          //   // lifeCount++;
          //   continue;
          // }
        }
      }
      // console.log(lifeCount);
      return { lifeCount, hasVines };
    }

    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        let { lifeCount, hasVines } = hasLife.call(this, height, width);

        //  console.log(lifeCount)

        if (currentBuffer[height][width] === 2) {
          backBuffer[height][width] = 0;
        }
        // if(currentBuffer[height][width] === 1){
        //   backBuffer[height][width] = 1;
        //   lifeCount = 5;
        // }

        // else{
        if (currentBuffer[height][width] === 1) {
          // console.log('currentBuffer')

          if (lifeCount < 1 || lifeCount > 3) {
            backBuffer[height][width] = 5;
          }
          // if(lifeCount < 2 || lifeCount > 3){
          //   backBuffer[height][width] = 1;
          // }
          else {
            backBuffer[height][width] = 2;
          }
        } else {
          if (lifeCount === 1) {
            backBuffer[height][width] = 0;
            // lifeCount--;
          }
          // if(lifeCount === 2){
          //   backBuffer[height][width] = 2;
          //   lifeCount = 0;
          // }
          if (lifeCount === 2) {
            backBuffer[height][width] = 1;
          }
          if (lifeCount === 1) {
            backBuffer[height][width] = 3;
          } else {
            backBuffer[height][width] = 1;
          }
        }
      }
      // }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Box;
