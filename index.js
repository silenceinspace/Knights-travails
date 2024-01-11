// Create a queue data structure to allow the BFS algorithm to search properly
class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element) {
    this.items[this.tail] = element;
    this.tail++;
  }

  dequeue() {
    delete this.items[this.head];
    this.head++;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    } else return this.items[this.head];
  }

  isEmpty() {
    if (this.head === this.tail) return true;
    else return false;
  }
}

// A graph data structure has two important elements to itself:
// 1. Vertices/vertex — a chess board, in my case
// 2. Edges/connections — possible moves that my knightMoves() method creates
class Graph {
  constructor() {
    this.vertices = this.#generateSquares();
  }

  #generateSquares() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      for (let j = 0; j < 8; j++) {
        board[i].push([{ visited: false, parent: null }]);
      }
    }
    return board;
  }

  #considerBoardSizeLimits(a, b) {
    // Access numbers inside the parameters' arrays
    const a1 = a.at(0);
    const a2 = a.at(1);
    const b1 = b.at(0);
    const b2 = b.at(1);

    if (a1 < 0 || a2 < 0 || a1 > 7 || a2 > 7) {
      console.log('Board coordinates must be from 0 to 7');
      return true;
    } else if (b1 < 0 || b2 < 0 || b1 > 7 || b2 > 7) {
      console.log('Board coordinates must be from 0 to 7');
      return true;
    } else if (a.join('') === b.join('')) {
      console.log('You have stayed in the same square');
      return true;
    } else return false;
  }

  knightMoves(start, end) {
    // Limit input options
    const limitsAreTriggered = this.#considerBoardSizeLimits(start, end);
    if (limitsAreTriggered) return false;

    const changesInX = [2, 1, 2, 1, -1, -2, -2, -1];
    const changesInY = [1, 2, -1, -2, 2, 1, -1, -2];
    const queue = new Queue();

    // the start square is automatically visited and added to the queue to enter a while loop
    const destination = this.vertices[end.at(0)][end.at(1)][0];
    const initialStart = start;
    this.vertices[start.at(0)][start.at(1)][0].visited = true;
    queue.enqueue(start);

    // BFS algorithm comes into play here
    while (queue.isEmpty() === false) {
      for (let i = 0; i < changesInX.length; i++) {
        const x = start.at(0) + changesInX[i];
        const y = start.at(1) + changesInY[i];

        if (0 > x || 0 > y || x > 7 || y > 7) {
          continue;
        } else if (this.vertices[x][y][0].visited === true) {
          continue;
        } else {
          this.vertices[x][y][0].visited = true;
          this.vertices[x][y][0].parent = start;
          queue.enqueue([x, y]);
        }
      }
      queue.dequeue();
      start = queue.peek();

      // If a destination has been visited already, break the loop immediately by a return statement
      if (destination.visited) {
        this.#findTheShortestPath(initialStart, destination, end);
        return true;
      }
    }
  }

  #findTheShortestPath(start, destinationParent, end) {
    const path = [end];
    let square = destinationParent.parent;

    while (square.join('') !== start.join('')) {
      path.push(square);
      square = this.vertices[square.at(0)][square.at(1)][0].parent;
    }

    let pathMessage = 'You have made it in ';
    if (path.length === 1) {
      pathMessage += '1 move';
    } else {
      pathMessage += `${path.length} moves`;
    }

    console.log(pathMessage);
    console.log('Here is the path:');
    console.log(start);
    path.reverse().forEach((x) => console.log(x));
  }
}

const chessBoard = new Graph();
// chessBoard.knightMoves([0, 0], [2, 1]);
// chessBoard.knightMoves([0, 0], [1, 1]);
// chessBoard.knightMoves([0, 0], [7, 7]);
// chessBoard.knightMoves([7, 7], [0, 0]);
// chessBoard.knightMoves([3, 3], [4, 3]);

// chessBoard.knightMoves([0, 0], [0, 0]);
// chessBoard.knightMoves([0, 0], [-1, 0]);
