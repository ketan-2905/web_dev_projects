import "./css/style.css"
import FullTodoList from "./model/fullTodo"
import TodoList from "./model/todoItems"
import TodotempletList from "./templates/todoTemplet"

const fullTodoList = FullTodoList.instance
const todotempletList = TodotempletList.instance

const remainingTask = (): string => { 

  if(!fullTodoList.todoListArray.length) return "0"
  let taskNo: number = 0;
  fullTodoList.todoListArray.forEach((todo) => {
    if (todo.checked) {
      taskNo++;
    }
  });
  return (fullTodoList.todoListArray.length - taskNo).toString();
};


const intapp = ():void =>{

  const taskcount = document.querySelector(".taskcount") as HTMLDivElement

  const from = document.querySelector(".add-task") as HTMLFormElement
  from?.addEventListener("submit",(e) =>{
    e.preventDefault()
    const todoInput = document.querySelector("#add-task") as HTMLInputElement
    if(!todoInput.value) return

    const todoInputText = todoInput.value.trim()
    const id: number = !fullTodoList.todoListArray.length ? 1 : (fullTodoList.todoListArray.length+1)

    const todoList = new TodoList(id.toString(),todoInputText)
    fullTodoList.addItem(todoList)

    const text = document.createTextNode(remainingTask()+" task remaning")
    taskcount.innerHTML = ''
    taskcount.appendChild(text);
    todotempletList.reander(fullTodoList)

    todoInput.value = ''
})

  const clearAllTask = document.querySelector(".clear")
  clearAllTask?.addEventListener("click",() =>{
    fullTodoList.clearTodoList()
    todotempletList.clear()

    const text = document.createTextNode(remainingTask()+" task remaning")
    taskcount.innerHTML = ''
    taskcount.appendChild(text);
  })

  const taskSection = document.querySelector(".task-list") as 
  HTMLUListElement

  taskSection.addEventListener("click", (e) => {
    if((e.target as HTMLLIElement).tagName === "LI"){
      const liElement  = e.target as HTMLLIElement
      liElement.classList.toggle("checked");
      if (liElement.className === "checked") {
        fullTodoList.todoListArray.forEach((todo) => {
          if(todo.id === liElement.id)
            {
              todo.checked = true
            }
        })
        const text = document.createTextNode(remainingTask() +" task remaning")
        taskcount.innerHTML = ''
        taskcount.appendChild(text);
      }
      else{
        fullTodoList.todoListArray.forEach((todo) => {
          if(todo.id === liElement.id)
            {
              todo.checked = false
            }
        })
        const text = document.createTextNode(remainingTask()+" task remaning")
        taskcount.innerHTML = ''
        taskcount.appendChild(text);
      }

    }

    fullTodoList.save()
})

  const RemoveAllCompleteTask = document.querySelector(".remove_complet")

  RemoveAllCompleteTask?.addEventListener("click" , () =>{
    fullTodoList.todoListArray.forEach((todo) => {
      if (todo.checked) {
        fullTodoList.removeItem(todo.id)
      }
    });
    todotempletList.reander(fullTodoList)
  })

  fullTodoList.load()
  todotempletList.reander(fullTodoList)

}

document.addEventListener("DOMContentLoaded", intapp)


