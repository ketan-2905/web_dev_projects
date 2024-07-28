import { IconClassNames, iconClassName } from "../model/iconClassName";

export interface MemoryGames {
  cardContainer: HTMLDivElement;
  move : HTMLSpanElement
  miss : HTMLSpanElement
  render(divElement : HTMLDivElement): void;
  pairArray: HTMLDivElement[];
  isflip: boolean;
  updateMoveMiss(move : HTMLSpanElement , miss : HTMLSpanElement) : void
}

export default class MemoryGame implements MemoryGames {
  cardContainer: HTMLDivElement = document.querySelector(
    ".card-container"
  ) as HTMLDivElement;
  pairArray: HTMLDivElement[] = [];
  isflip: boolean = false;
  noOfMove : number = 0 
  noOfMiss : number = 0
  move: HTMLSpanElement = document.querySelector(
    ".no-of-move") as HTMLSpanElement; 
  miss: HTMLSpanElement = document.querySelector(
    ".no-of-miss") as HTMLSpanElement;   

  static instance = new MemoryGame();

  private constructor() {
    let array = this.getRandomNumberArray();

    for (let index = 0; index < array.length; index++) {
      const icon: IconClassNames = iconClassName[array[index]];

      const card = document.createElement("div") as HTMLDivElement;
      card.classList.add("card");
      card.id = icon.id.toString();

      const cardInterface = document.createElement("div");
      cardInterface.classList.add("card-interface");

      const frontSide = document.createElement("div");
      frontSide.classList.add("front");

      const iFront = document.createElement("i");
      iFront.classList.add("fa-solid");
      iFront.classList.add("fa-question");

      frontSide.appendChild(iFront);

      const backtSide = document.createElement("div");
      backtSide.classList.add("back");

      const iBack = document.createElement("i");
      iBack.classList.add(icon.className1);
      iBack.classList.add(icon.className2);
      iBack.style.color = icon.color;

      backtSide.appendChild(iBack);

      cardInterface.appendChild(frontSide);
      cardInterface.appendChild(backtSide);

      card.appendChild(cardInterface);

      card.addEventListener("click", () => {
        card.classList.add("Partially-rotate")
        this.render(card)
      });

      this.cardContainer.appendChild(card);
    }
  }

  render(divElement : HTMLDivElement): void {
    if(this.pairArray.includes(divElement)) return
    this.pairArray.push(divElement)
    if(this.pairArray.length === 3){     
        this.isflip = true
    }

    if(this.isflip){
        if(this.pairArray[0].id ===  this.pairArray[1].id){
            for (let index = 0; index < 2; index++) {
              this.pairArray[index].classList.remove("card")
              this.pairArray[index].style.pointerEvents = "none"
              }
              this.pairArray = this.pairArray.filter((element , index) => index === 2 ) 
              this.noOfMove++ 
              this.updateMoveMiss(this.move , this.miss)          
        }else{ 
          for (let index = 0; index < 2; index++) {
            this.pairArray[index].classList.remove("Partially-rotate")
            } 
              this.pairArray = this.pairArray.filter((element , index) => index === 2 )
              this.noOfMove++
              this.noOfMiss++ 
              this.updateMoveMiss(this.move , this.miss)
        }
    }
  }

  private getRandomNumberArray = (): number[] => {
    const array: number[] = [];

    while (array.length !== 30) {
      let number = Math.floor(Math.random() * 30);
      if (!array.includes(number)) {
        array.push(number);
      }
    }

    return array;
  };

  updateMoveMiss(move : HTMLSpanElement , miss : HTMLSpanElement) : void{
    move.innerText = this.noOfMove.toString()
    miss.innerText = this.noOfMiss.toString()
  }
}
