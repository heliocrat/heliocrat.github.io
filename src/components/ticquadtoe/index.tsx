import { createSignal, For } from "solid-js";
import "./style.css";
//  board Map
//  0 |1 | 2| 3
//  4 |5 | 6| 7
//  8 |9 |10|11
//  12|13|14|15

const winConditions = [
  // all boxes
  [0, 1, 4, 5],
  [1, 2, 5, 6],
  [2, 3, 6, 7],
  [4, 5, 8, 9],
  [5, 6, 9, 10],
  [6, 7, 10, 11],
  [8, 9, 12, 13],
  [9, 10, 13, 14],
  [10, 11, 14, 15],
  // all vertical lines
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // all horizontal lines
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // all diagonals
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

const xPiece = "╳";
const oPiece = "◯";
type Pieces = typeof xPiece | typeof oPiece;
type Board = (Pieces | "")[];
type Tally = Record<Pieces, number[]>;
const emptyBoard: Board = [
  "", "", "", "",
  "", "", "", "",
  "", "", "", "",
  "", "", "", "",
];
const tallyPieces = (board: Board) =>
  board.reduce(
    (acc, cur, index) => {
      if (cur) acc[cur].push(index);
      return acc;
    },
    { [xPiece]: [], [oPiece]: [] } as Tally
  );
const checkWin = (winCondition: number[], pieces: number[]) =>
  new Set(winCondition).intersection(new Set(pieces)).size === 4;
const findWin = (tally: Tally, turn: Pieces) => {
  const win = winConditions.filter((win) => checkWin(win, tally[turn]));
  return win.length ? { pieces: win.flatMap((i) => i) } : false;
};

export function TicQuadToe() {
  const [isWinner, setIsWinner] = createSignal<null | number[]>(null);
  const [board, setBoard] = createSignal<Board>(emptyBoard);
  const [turn, setTurn] = createSignal<Pieces>(xPiece);

  const updateBoard = (square: string, num: number, piece: Pieces) => {
    if (square || isWinner()) return;
    setBoard((prev) => prev.with(num, piece));
    let win = findWin(tallyPieces(board()), turn());
    if (win) setIsWinner(win.pieces);
    if(!board().includes('')) setIsWinner([])
    setTurn((prev) => (prev === xPiece ? oPiece : xPiece));
  };
  const reset = () => {
    setBoard(emptyBoard);
    setIsWinner(null);
  };
  const turnMessage = (winner: null | number[], turn: Pieces) => {
    if(!winner) return `${turn} 's turn`
    if(winner.length === 0) return "It's a Draw"
    return `${board()[winner[0]]} Wins!`
  }

  return (
    <>
      <h3 class="center">Place FOUR pieces in a LINE or a BOX to win.</h3>
      <div class="board">
        <For each={board()}>
          {(each, index) => (
            <span
              class={`square ${isWinner()?.includes(index()) ? "winning" : ""}`}
              onClick={() => updateBoard(each, index(), turn())}
            >
              {each}
            </span>
          )}
        </For>
      </div>
      <h3 class="center">
        {turnMessage(isWinner(), turn())}
      </h3>
      {isWinner() && (
        <div class="center">
          <button onClick={reset}>Reset</button>
        </div>
      )}
    </>
  );
}
