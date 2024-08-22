import "./css/style.css";
import MemoryGame from "./templates/memorygame";


const intapp = ():void => {
  const instance = MemoryGame.instance
  instance.isflip = false
}

document.addEventListener("click" , intapp)
