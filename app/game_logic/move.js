export class Move { 
  constructor(type, squares) {
    this.type = type;
    this.squares = squares;
  }

  toString() {
    return this.squares.join(this.type);
  }

  begin() {
    return this.squares[0];
  }

  end() {
    return this.squares[this.squares.length - 1];
  }

  isCapture() {
    return this.type === 'x';
  }
}