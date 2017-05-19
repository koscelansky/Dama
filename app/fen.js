
export function fromFen(fen) {
  if (typeof fen !== 'string')
    throw new TypeError('fen should be string.');

  const parts = fen.split(':'); 

  if (parts.length !== 3) {
    console.log('FEN doesn\'t have three parts - <turn>:<player1>:<player2>.');
    return null;
  }

  const turn = parts[0];
  if (turn.length != 1 || (turn[0] != 'B' && turn[0] != 'W')) {
    console.log('Turn in FEN neither "B", nor "W".');
    return null;
  } 

  let pieces = Array(32).fill(null);
  let lastColor = null;

  for (let i of [1, 2]) {
    const p = parts[i]; 

    if (p === '') 
      continue; 

    if (p[0] != 'B' && p[0] != 'W') {
      console.log('Player position in FEN begin neither with "B", nor with "W".');
      return null;    
    }

    if (p[0] === lastColor) {
      console.log('Same players position two time in FEN.');
      return null;    
    }

    lastColor = p[0];

    for (let j of p.substring(1).split(',')) {
      if (j === '') {
        console.log('One position is empty in FEN.');
        return null;
      }

      let type = 'M';
      if (j[0] == 'K') {
        type = 'K';
        j = j.substring(1);
      }

      const pos = Number.parseInt(j) - 1;

      if (pos === NaN || pos < 0 || pos >= 32) {
        console.log('Square number is invalid in FEN.');
        return null;
      }

      if (pieces[pos] !== null) {
        console.log('Position already taken in FEN.');
        return null;  
      }

      pieces[pos] = lastColor + type;
    }
  }

  return { turn: turn, pieces: pieces };
}
