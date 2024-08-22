
import FullTodoList from "../model/fullTodo";

export interface Todotemplet{
    UL : HTMLUListElement
    reander(fullTodoList : FullTodoList):void,
    clear():void
}

export default class TodotempletList implements Todotemplet{
    
    static instance = new TodotempletList()

    UL : HTMLUListElement
    
    private constructor(){
        this.UL = document.querySelector(".task-list") as HTMLUListElement
    }

    clear(): void {
        this.UL.innerHTML = ''
    }

    reander(fullTodoList : FullTodoList): void {
        this.clear()


        fullTodoList.todoListArray.forEach(todo => {
            
        const li = document.createElement("li")
        li.id = todo.id
        const div = document.createElement("div")
        div.classList.add("to-do-Text")
        const text = document.createTextNode(todo.item)
        div.appendChild(text);
        li.appendChild(div)

        fullTodoList.todoListArray.forEach((todo1) =>{
            if(todo1.checked){
                if(li.id === todo1.id){
                    li.classList.add("checked")
                }
            }
            const taskcount = document.querySelector(".taskcount") as HTMLDivElement

            const text = document.createTextNode(this.remainingTask(fullTodoList)+" task remaning")
            taskcount.innerHTML = ''
            taskcount.appendChild(text);
            fullTodoList.save()
        })


        const span = document.createElement("span")
        span.innerHTML="\u00d7"

        li.appendChild(span)

        span.addEventListener("click", () =>{
            fullTodoList.removeItem(todo.id)

            const taskcount = document.querySelector(".taskcount") as HTMLDivElement

            const text = document.createTextNode(this.remainingTask(fullTodoList)+" task remaning")
            taskcount.innerHTML = ''
            taskcount.appendChild(text);
            fullTodoList.save()
            this.reander(fullTodoList) 
        })

        this.UL.appendChild(li)
})
  
}

private remainingTask = (fullTodoList: FullTodoList): string => { 
    console.log(fullTodoList.todoListArray.length)
    if(!fullTodoList.todoListArray.length) return "0"
    let taskNo: number = 0;
    fullTodoList.todoListArray.forEach((todo) => {
      if (todo.checked) {
        taskNo++;
      }
    });
    return (fullTodoList.todoListArray.length - taskNo).toString();
  };

}