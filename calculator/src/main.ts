import "./css/style.css";
import CalculatorTemplaets from "./templates/calculatetamplate";

const allClear = document.querySelector(".all-clear");
const del = document.querySelector(".delete");

const decimal = document.querySelector(".decimal");

const operators = document.querySelectorAll(".operator");
const digits = document.querySelectorAll(".digit");

const equals = document.querySelector(".equals") as HTMLButtonElement;

const initapp = (): void => {
  const instance = CalculatorTemplaets.instance;

  allClear?.addEventListener("click", () => {
    instance.allClear(
      instance.curruntOutputElement,
      instance.previousOutputElement
    );
  });

  digits.forEach((digit) => {
    digit.addEventListener("click", (e) => {
      const targetElement = e.target as HTMLButtonElement;

      if (
        instance.curruntOutput === "Infinity" ||
        instance.curruntOutput === "NaN"
      ) {
        instance.curruntOutput = "";
        instance.curruntOutputElement.innerText = "";
      }

      if (instance.isCalculated) {
        instance.deafult()
      }

      instance.curruntOutput = instance.curruntOutput + targetElement.innerText;
      instance.curruntOutputElement.innerText = instance.displayNumber(
        instance.curruntOutput
      );
    });
  });

  decimal?.addEventListener("click", (e) => {
    if (instance.isCalculated) {
      instance.deafult()
    }

    if (instance.curruntOutput.includes(".")) return;
    const targetElement = e.target as HTMLButtonElement;

    if (!instance.curruntOutput) {
      instance.curruntOutput = "0.";
      instance.curruntOutputElement.innerText = instance.displayNumber(
        instance.curruntOutput
      );
      return;
    }

    if (
      instance.curruntOutput === "Infinity" ||
      instance.curruntOutput === "NaN"
    ) {
      instance.curruntOutput = "";
      instance.curruntOutputElement.innerText = "";
    }

    instance.curruntOutput = instance.curruntOutput + targetElement.innerText;
    instance.curruntOutputElement.innerText = instance.displayNumber(
    instance.curruntOutput
    );
  });

  del?.addEventListener("click", () => {
    instance.delete(instance.curruntOutputElement);
  });

  operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
      if (
        !instance.curruntOutputElement.innerText &&
        !instance.previousOutputElement.innerText
      )
      return;
      const operatorButton = e.target as HTMLButtonElement;

      if (instance.curruntOutput && instance.previousOutput) {
        instance.previousOutputElement.innerText = "";
        
        const calculat = instance.operation();
        instance.previousOutput = "";
        instance.curruntOutput = calculat;
        instance.curruntOutputElement.innerText =
        instance.displayNumber(calculat);
        instance.isCalculated = false;
        instance.operator = "";
        
        if (
          instance.curruntOutput === "Infinity" ||
          instance.curruntOutput === "NaN"
        ){
          instance.deafult()
          return;
        }
      }

      if (instance.operator) {
        instance.operator = operatorButton.innerText;
        instance.previousOutputElement.innerText =
          instance.previousOutputElement.innerText.slice(0, -1) +
          instance.operator;
      }
      
      if (!instance.operator) {
        instance.isCalculated = false;
        instance.operator = operatorButton.innerText;
        instance.previousOutput = instance.curruntOutput;
        instance.curruntOutput = "";
        instance.previousOutputElement.innerText =
        instance.displayNumber(instance.previousOutput) + instance.operator;
        instance.curruntOutputElement.innerText = "";
      }
    });
  });

  equals?.addEventListener("click", () => {
    if (!instance.curruntOutput || !instance.previousOutput) return;

    instance.previousOutputElement.innerText = "";

    const calculat = instance.operation();

    instance.previousOutputElement.innerText = `${instance.previousOutput} ${instance.operator} ${instance.curruntOutput}`;
    instance.previousOutput = "";
    instance.curruntOutput = calculat;
    instance.curruntOutputElement.innerText = instance.displayNumber(calculat);

    instance.isCalculated = true;
    instance.operator = "";
  });
};

document.addEventListener("DOMContentLoaded", initapp);
