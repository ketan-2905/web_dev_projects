import TodoList from "./todoItems";

export interface FullTodo{
    todoListArray:TodoList[],
    load():void,
    save():void,
    clearTodoList():void,
    addItem(itemObj:TodoList):void,
    removeItem(_id:string):void
}

export default class FullTodoList implements FullTodo{
    
    static instance:FullTodoList = new FullTodoList()

    private constructor(
       private _todoListArray:TodoList[] = []
    ){}

    get todoListArray():TodoList[] {
        return this._todoListArray
    }

    load():void{
      const  todoData: String | null = localStorage.getItem("myTodo")

      if(typeof(todoData) !== "string") return

      const todoDataList: {_id:string, _item:string, _checked:boolean}[] = JSON.parse(todoData)

      console.log(todoDataList)
      
      todoDataList.forEach(itemobj => {
        const tempTodo: TodoList = new TodoList(itemobj._id, itemobj._item, itemobj._checked)

        FullTodoList.instance.addItem(tempTodo)
      });
    }

    save():void{
        localStorage.setItem("myTodo", JSON.stringify(this._todoListArray))
    }

    addItem(itemObj:TodoList):void{
        this._todoListArray.push(itemObj)
        this.save()
    }

    removeItem(_id: string): void {
        this._todoListArray = this._todoListArray.filter(todoobj => todoobj.id !== _id )
        this.save()
    }

    clearTodoList(): void {
        this._todoListArray =[]
        this.save()
    }
}