import { getSquaresBetween } from './possible-moves'
import { squareToAlgebraic } from './const'

export class Move {
  constructor(type, squares, huff) {
    this.type = type
    this.squares = squares
    this.huff = huff != null ? huff : null
  }

  static fromJSON(str) {
    const data = JSON.parse(str)
    return new Move(data.type, data.squares, data.huff)
  }

  toJSObj() {
    return { ...this }
  }

  static fromJSObj(obj) {
    return new Move(obj.type, obj.squares, obj.huff)
  }

  toString() {
    const algebraicSquares = this.squares.map(squareToAlgebraic)
    const moveStr = algebraicSquares.join(this.type === 'x' ? 'x' : '-')
    
    if (this.huff != null) {
      const huffSquare = squareToAlgebraic(this.huff)
      return moveStr + '; ' + huffSquare
    }
    
    return moveStr
  }

  begin() {
    return this.squares[0]
  }

  end() {
    return this.squares[this.squares.length - 1]
  }

  length() {
    return this.squares.length
  }

  isCapture() {
    return this.type === 'x'
  }

  // returns array of squares which this move can capture, there is no check
  // it that is possible, the class has no information about the board state
  getCapturedSquares() {
    let result = []

    for (let i = 0; i < this.squares.length - 1; ++i) {
      result = result.concat(getSquaresBetween(this.squares[i], this.squares[i + 1]))
    }

    return result
  }
}
