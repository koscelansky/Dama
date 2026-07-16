# Slovak Checkers (Dáma)

The most widespread and well-known variant in Slovakia.

## Setup and Movement

- **The Board:** It is played on an 8×8 chessboard.
- **Starting Position:** At the beginning, opponents each have eight pawns (pieces) standing on opposite sides in the first two rows on the dark squares.
- **General Movement:** All pieces move diagonally; they cannot jump over pieces of their own color.
- **Pawns:** Pawns move only forward. If they are not capturing an opponent's piece, they move one square at a time.

## Capturing

- **Capturing is not strictly forced.** A player may choose to move without capturing even when a capture is available. However, doing so exposes that piece to the huffing penalty (see Rules of Punishment below).
- **Mechanics:** A pawn captures by jumping diagonally over an opponent's piece to the free square immediately beyond it. If the landing square allows another jump, the pawn must continue capturing in the same turn (multi-jump).
- **Queen Promotion:** When a pawn reaches the opposite side of the board during a move or capture, it immediately promotes to a Queen (Dáma). If promoted during a multi-jump, the turn ends — the newly promoted Queen may not continue capturing in the same turn.
- **The Queen:** A Queen can move both forward and backward across any number of free squares diagonally. When capturing, the Queen jumps over an opponent's piece and may land on any free square beyond it. If another capture is then possible, it must continue.

## Rules of Punishment (Huffing)

- **Missed Captures:** If a player fails to capture when a capture was available, the opponent may remove one of the pieces that could have captured as a penalty, before making their own move. If multiple pieces could have captured, the opponent chooses which one to remove.
- **Unfinished Multi-jumps:** If the piece that just moved had the opportunity to capture yet another piece but stopped, the opponent may remove it before making their own move.
- **Queen Priority:** If a player can capture with both a pawn and a Queen, they must capture with the Queen. If they capture with the pawn instead, the opponent may remove the Queen as a penalty before making their own move.

## Winning and Draws

- **Winning:** The player who captures all of their opponent's pieces wins.
- **Draws:** The game ends in a draw if:
   1. The player whose turn it is cannot make any legal move.
   2. Neither player has made a capture in the last fifteen moves (the fifteen-move rule).
   3. Both players agree that neither can force a win.

## FEN Notation

Positions are encoded using the [Portable Draughts Notation](https://en.wikipedia.org/wiki/Portable_Draughts_Notation)
FEN format: `[Turn]:[Color 1][K][Square number][,]...]:[Color 2][K][Square number][,]...]`.

Since standard PDN has no notion of huffing, this app extends the format with an
optional fourth, colon-separated section listing the squares of pieces that are
currently eligible to be huffed: `:X[Square number][,]...]`. This section is
omitted entirely when no piece can be huffed.

Example: `W:W1,K2:B24,25:X24,25` means white to move, with a white man on
square 1 and a white king on square 2, black men on squares 24 and 25, both of
which may be huffed instead of white making a normal move.