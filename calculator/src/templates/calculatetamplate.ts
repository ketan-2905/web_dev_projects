export interface Calculators{
    curruntOutput : string,
    previousOutput : string,
    operation(operator:string):String,
    delete(curruntOutputElement: HTMLDivElement):void,
    allClear(curruntOutputElement: HTMLDivElement , previousOutputElement : HTMLDivElement):void,
    displayNumber(number:string):string
}

export default class Calculator implements Calculators{
    static instance = new Calculator()

    curruntOutput : string
    previousOutput : string
    curruntOutputElement : HTMLDivElement = document.querySelector(".currunt-output") as HTMLDivElement
    previousOutputElement : HTMLDivElement = document.querySelector(".previous-output") as HTMLDivElement
    operator : string
    isCalculated : boolean

    private constructor(){
        
        this.curruntOutput = "",
        this.previousOutput = "",
        this.operator = ""
        this.isCalculated = false
    }

    operation():string{
        switch (this.operator){
            
            case "+":
                this.isCalculated = true
                return (parseFloat(this.previousOutput) + parseFloat(this.curruntOutput)).toString()
            case "-":
                this.isCalculated = true
                return (parseFloat(this.previousOutput) - parseFloat(this.curruntOutput)).toString()
            case "*":
                this.isCalculated = true
                return (parseFloat(this.previousOutput) * parseFloat(this.curruntOutput)).toString()
            case "÷":
                this.isCalculated = true
                return (parseFloat(this.previousOutput) / parseFloat(this.curruntOutput)).toString()
            default : 
                return ""
        }
    }

    allClear(curruntOutputElement: HTMLDivElement , previousOutputElement : HTMLDivElement):void {
        this.operator = ""
        this.curruntOutput = ""
        this.previousOutput = ""
        curruntOutputElement.innerText = ""
        previousOutputElement.innerText = ""
        this.isCalculated = false
    }


    delete(curruntOutputElement: HTMLDivElement): void {
        if(this.isCalculated){
            this.previousOutputElement.innerText = ""
            curruntOutputElement.innerText = ""
            this.curruntOutput = ''
            this.isCalculated = false
            return
        }
        if(this.curruntOutput){
        this.curruntOutput=this.curruntOutput.slice(0,-1);
        }
        if(curruntOutputElement.innerText === "Infinity" || curruntOutputElement.innerText === "NaN" ){
            curruntOutputElement.innerText = ""
            this.curruntOutput = ''
            this.isCalculated = false
            return
        }
        if(this.curruntOutput){
        curruntOutputElement.innerText = this.displayNumber(this.curruntOutput)
        }else{
        this.curruntOutput = ""
        curruntOutputElement.innerText = ""
        }
    }

    displayNumber(number:string):string{
        if(number.includes(".")){
            const integerPart : string = number.split(".")[0]
            const fractionPart : string = number.split(".")[1]
            return this.displayNumber(integerPart)+"."+fractionPart
        }
        return parseFloat(number).toLocaleString()
    }

    deafult():void{
        this.curruntOutput = "";
        this.previousOutput = "";
        this.isCalculated = false;
        this.curruntOutputElement.innerText = "";
        this.previousOutputElement.innerText = "";
    }
}