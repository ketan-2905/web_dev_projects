export interface Todo{
    id:string,
    item:string,
    checked:boolean
}

export default class TodoList implements Todo{
    constructor(
        private _id:string = '',
        private _item:string = '',
        private _checked:boolean = false,
    ){}

    get id():string{
        return this._id
    }

    set id(_id:string){
        this._id = _id
    }

    get item():string{
        return this._item
    }

    set item(_item:string){
        this._item = _item
    }
    

    get checked():boolean{
        return this._checked
    }

    set checked(_checked:boolean){
        this._checked = _checked
    }
}