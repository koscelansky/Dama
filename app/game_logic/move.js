// @flow

export class Move {
  type: '-' | 'x';
  squares: number[];
  
  constructor(type: '-' | 'x', squares: number[]) {
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
}