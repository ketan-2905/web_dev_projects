import "./css/style.css"
import { Rule, rules } from "./model/rule";
import RuleTemplates from "./templates/template";

const passArray = (rules: Rule[]): string[] => {
  const array: string[] = [];
  rules.forEach((rule: Rule) => {
    array.push(rule.password);
  });
  return array;
};

const intapp = (): void => {
  const passwords: string[] = passArray(rules);



  const passfiled = document.querySelector(
    "#password-filed"
  ) as HTMLInputElement;

  const charCount = document.querySelector(".char-count") as HTMLDivElement;

  passfiled.addEventListener("input", (): void => {
    const password = passfiled.value;
    const text = document.createTextNode(password.length.toString());
    charCount.innerHTML = "";
    charCount.appendChild(text);
    updateUi(passfiled.value.toLowerCase(), passwords);
  });
};

const updateUi = (input: string, passwords: string[]): void => {
  const instance = RuleTemplates.instance;
  passwords.forEach((password, index) => {
    if (password !== "num" && password !== "spc"){
      const expresion = new RegExp(password);
      instance.render(expresion.test(input), index);
    }
    if (password === "num") {
      let num = 0;
      for (let index = 0; index < input.length; index++) {
        if (input.charAt(index) >= "0" && input.charAt(index) <= "9") {
          num = num + parseInt(input.charAt(index));
        }
      }
      instance.render(num.toString() === '25', index);
    }
    if (password === "spc") {
      const specialCharacters = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "-",
        "_",
        "=",
        "{",
        "}",
        "[",
        "]",
        "|",
        ":",
        ";",
        '"',
        "'",
        "<",
        ">",
        ",",
        ".",
        "?",
        "/",
      ];
      let check: boolean = false
     for (const char  of specialCharacters) {
        if(input.includes(char)) {
          check = input.includes(char)
          console.log(check)
          break
        } 
        check = input.includes(char)
      }
        
    
      instance.render(check, index);
    
    }
  });
};

document.addEventListener("DOMContentLoaded", intapp);
