// Eamon McKeon
// JS for calculator project


/*

// DOM references to buttons
// Numbers
const oneButton = document.querySelector("#one");
const twoButton = document.querySelector("#two");
const threeButton = document.querySelector("#three");
const fourButton = document.querySelector("#four");
const fiveButton = document.querySelector("#five");
const sixButton = document.querySelector("#six");
const sevenButton = document.querySelector("#seven");
const eightButton = document.querySelector("#eight");
const nineButton = document.querySelector("#nine");
const zeroButton = document.querySelector("#zero");
// Operators
const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
//

*/

const displayValue = document.querySelector("#display");

const buttonList = document.querySelector("#button-container");

buttonList.addEventListener('click', (event) => {
    //alert(event.target.textContent);
    let input = event.target.textContent;
    if (!isNaN(Number(input)) && !display["operator"]) {
        if (display["first"]) {
            display["first"] += input;
        }
        else {
            display["first"] = input;
        }
        displayValue.textContent = display["first"];
    }
})


let num1;
let num2;
let operator;

let display = {};

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            add(num1, num2);
            break;
        case "-":
            subtract(num1, num2);
            break;
        case "x":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);
    }
}

/*

Create the functions that populate the display when you click 
the number buttons. You should be storing the ‘display value’ 
in a variable somewhere for use in the next step.

*/

// add event listener for button display that reads in button text content 
// depending on button clicked, do something!

// start with populating the display (for numbers)
