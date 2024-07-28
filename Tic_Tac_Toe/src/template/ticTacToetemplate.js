import { numbers } from '../model/player.js'
import TicTacToeGame from '../model/game.js'

export class TicTacToeLayout{

    static instance = new TicTacToeLayout()

    constructor(){

        const gameInstance = TicTacToeGame.instance

        this.xTurn = document.querySelector(".x-turn")
        this.oTurn = document.querySelector(".o-turn")

        this.xWinsElement = document.querySelector(".x-win")
        this.oWinsElement = document.querySelector(".o-win")

        this.restartBtn = document.querySelector(".restart")

        this.restartBtn.addEventListener("click" , (e) => {
            this.restart(gameInstance)
        })

        this.layoutElement = document.querySelector(".tic-tac-toe-layout")
        this.buttons = Array(9).fill(null)

        this.createGameLayout(gameInstance)
    }

    createGameLayout(gameInstance) {
        for (let index = 0; index < 9; index++) {
            const btn = document.createElement('button')
            btn.classList.add('cells', numbers[index])
            btn.id = index.toString()
            this.buttons[index] = btn
            this.layoutElement.append(btn)
        }



        this.buttons.forEach((button) => {
            button.addEventListener('click' , (e) => {
                this.updateUi(button , gameInstance.isXTurn , gameInstance)
            })
        })

        gameInstance.cells = this.buttons

        if(gameInstance.isXTurn){
            this.xTurn.classList.add("scale") 
        }
    }

    createWinnwerLayout(winnerSymbol , gameInstance ) {

        if(winnerSymbol === 'X'){
            this.xWinsElement.innerText = gameInstance.xWins.toString()
            const div1 = document.createElement('div')
            div1.classList.add('winner-symbol' , 'X')
            const i = document.createElement('i')
            i.classList.add('fa-solid' , 'fa-x')
            div1.append(i)
            const div2 = document.createElement('div')
            div2.classList.add('winner-text')
            div2.innerText = 'WINNER!'
            this.layoutElement.append(div1)
            this.layoutElement.append(div2)
         }
    
         if(winnerSymbol === 'O'){
            this.oWinsElement.innerText = gameInstance.oWins.toString()
            const div1 = document.createElement('div')
            div1.classList.add('winner-symbol' , 'O')
            const i = document.createElement('i')
            i.classList.add('fa-regular' , 'fa-circle')
            div1.append(i)
            const div2 = document.createElement('div')
            div2.classList.add('winner-text')
            div2.innerText = 'WINNER!'
            this.layoutElement.append(div1)
            this.layoutElement.append(div2)
         }
    }


    updateUi(cell , isXTurn , gameInstance) {
        if(cell.innerHTML) cell.innerHTML = ''
        
         if(isXTurn){
            cell.classList.add('X')
            const i = document.createElement('i');
            i.classList.add('fa-solid' , 'fa-x')
            cell.append(i)

            this.xTurn.classList.remove("scale")
            this.oTurn.classList.add("scale") 

         }else{
            cell.classList.add('O')
            const i = document.createElement('i');
            i.classList.add('fa-regular' , 'fa-circle')
            cell.append(i)

            this.oTurn.classList.remove("scale")
            this.xTurn.classList.add("scale") 
    
         }

         gameInstance.choosewinner(cell)

         if(!isXTurn){
             if(gameInstance.xPlayerCells.length === 3){
                gameInstance.xPlayerCells[0].classList.add("textBlur")
            }
         }else{
            if(gameInstance.oPlayerCells.length === 3){
                gameInstance.oPlayerCells[0].classList.add("textBlur")
            }
         }

         cell.disabled = true 

 

         if(gameInstance.winner){
            this.winner(gameInstance.winner , gameInstance)
        } 
        
    }

    winner(winnerSymbol , gameInstance) {
        const self = this

        this.oTurn.classList.remove("scale")
        this.xTurn.classList.remove("scale")

        setTimeout(function() {
            self.layoutElement.innerHTML = ''
            self.layoutElement.classList.remove('tic-tac-toe-gride-layout')
            self.layoutElement.classList.add('tic-tac-toe-winnweDraw-layout')
            self.createWinnwerLayout(winnerSymbol , gameInstance)
        } , 100)
    }


    restart(gameInstance) {

        this.oTurn.classList.remove("scale")
        gameInstance.resetGame()
        this.layoutElement.innerHTML = ''
        this.layoutElement.classList.remove('tic-tac-toe-winnweDraw-layout')
        this.layoutElement.classList.add('tic-tac-toe-gride-layout')
        this.createGameLayout(gameInstance)
    }
}