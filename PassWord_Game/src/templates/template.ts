import { Rule, rules} from "../model/rule";

export interface Template{
    DIV: HTMLDivElement,
    DIVS:NodeList
    render(check:boolean,id:number):void,
}

export default class RuleTemplates implements Template{

    static instance:RuleTemplates = new RuleTemplates()
    
    DIV:HTMLDivElement
    DIVS:NodeList

    private constructor(){
       this.DIV = document.querySelector(".rules-section") as HTMLDivElement

       const Rules = rules.reverse()

       Rules.forEach((rule:Rule,index) => {
        if(!rule.src){
        const parentdiv = document.createElement("div")
        parentdiv.id = rule.id.toString()
        if(index === (Rules.length - 1)){
        parentdiv.classList.add("div", "ruleR")
        }else{
            parentdiv.classList.add("div", "ruleR" , "hide")
        }

        const childdiv1= document.createElement("div")
        childdiv1.classList.add("rule")

        const i = document.createElement("i")
        i.classList.add("fa-solid" , "fa-xmark" , "colourR")

        const text1 =document.createTextNode(`Rule ${rule.id}`)
        childdiv1.appendChild(i)
        childdiv1.appendChild(text1)

        const childdiv2 = document.createElement("div")
        const text2 =document.createTextNode(rule.rule)
        childdiv2.appendChild(text2)
        
        parentdiv.appendChild(childdiv1)
        parentdiv.appendChild(childdiv2)
        
        this.DIV.appendChild(parentdiv)
        }else{
            const parentdiv = document.createElement("div")
            parentdiv.id = rule.id.toString()
            if(index ===  (Rules.length - 1)){
                parentdiv.classList.add("div" , "ruleR")
                }else{
                    parentdiv.classList.add("div" , "ruleR" , "hide")
                }

            const childdiv1= document.createElement("div")
            childdiv1.classList.add("rule")

            const i = document.createElement("i")
            i.classList.add("fa-solid" , "fa-xmark" , "colourR")

            const text1 = document.createTextNode(`Rule ${rule.id}`)
            childdiv1.appendChild(i)
            childdiv1.appendChild(text1)

            const childdiv2 = document.createElement("div")
            const text2 = document.createTextNode(rule.rule)
            childdiv2.appendChild(text2)

            const img = document.createElement("img")
            img.src = rule.src
            
            parentdiv.appendChild(childdiv1)
            parentdiv.appendChild(childdiv2)
            parentdiv.appendChild(img)

            this.DIV.appendChild(parentdiv)
        }
    })
    this.DIVS = document.querySelectorAll(".div")
    }

    render = (check:boolean,id:number):void => {
        const currdivelement = this.DIVS[id] as HTMLDivElement
        const iElement = currdivelement.firstChild?.firstChild as HTMLElement
        if(check){
            currdivelement.classList.remove("ruleR")
            currdivelement.classList.add("ruleG")
            iElement.classList.remove("fa-xmark", "colourR");
            iElement.classList.add("fa-check", "colourG");
            if((id - 1) >= 0){
            const nextdivelement = this.DIVS[id - 1] as HTMLDivElement
            nextdivelement.classList.remove("hide")
            }
        }else{
            currdivelement.classList.remove("ruleG")
            currdivelement.classList.add("ruleR")
            iElement.classList.remove("fa-check", "colourG");
            iElement.classList.add("fa-xmark", "colourR");
        }
        
    }
}
