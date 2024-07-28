export default class TicTacToeGame {
    static instance =new TicTacToeGame()
   constructor() {
    this.cells = Array(9).fill(null);
    this.isXTurn = true ;
    this.totalMoves = 0;
    this.xPlayerCells =[]
    this.oPlayerCells = []
    this.winner = ''
    this.xWins = 0
    this.oWins = 0
  }

  checkWinCondition(cells) {
    const winpattern = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];

    //   winpattern.forEach((cell) => {
    //     if(cells[cell[0]].classlist.contain("X") && cells[cell[1]].classlist.contain("X") && cells[cell[2]].classlist.contain("X")){
    //         this.winner("X")
    //         return
    //     }
    //   })

    for (let index = 0; index < winpattern.length; index++) {
        if(cells[index]){
            if (
                cells[winpattern[index][0]].classList.contains("X") &&
                cells[winpattern[index][1]].classList.contains("X") &&
                cells[winpattern[index][2]].classList.contains("X")
              ){
                this.winner = "X"
                this.xWins++
                return;
              }
              
              if (
                cells[winpattern[index][0]].classList.contains("O") &&
                cells[winpattern[index][1]].classList.contains("O") &&
                cells[winpattern[index][2]].classList.contains("O")
              ){
                this.winner = "O"
                this.oWins++
                return;
              } 
        }
  } 
}
  choosewinner(cell) {
    if(this.isXTurn){
      this.isXTurn = false
      this.xPlayerCells.push(cell)
      if(this.xPlayerCells.length === 4){
        this.xPlayerCells[0].disabled = false;
        this.xPlayerCells[0].innerHTML = ''
        this.xPlayerCells[0].classList.remove("X")
        this.xPlayerCells[0].classList.remove("textBlur")
        this.xPlayerCells.shift()
      }
    }else{
      this.isXTurn = true
      this.oPlayerCells.push(cell)
      if(this.oPlayerCells.length === 4){
        this.oPlayerCells[0].disabled = false;
        this.oPlayerCells[0].innerHTML = ''
        this.oPlayerCells[0].classList.remove("O")
        this.oPlayerCells[0].classList.remove("textBlur")
        this.oPlayerCells.shift()
      }
    }
    this.totalMoves++
    this.checkWinCondition(this.cells);
  }

  resetGame() {
    this.cells = Array(9).fill(null);
    this.totalMoves = 0;
    this.xPlayerCells =[]
    this.oPlayerCells = []
    this.winner = ''
    this.isXTurn = true ;
  }
}
