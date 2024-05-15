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
    // When nothing has been clicked and the clicked button is a number
    if (input === "=") {
        displayValue.textContent = operate(Number(display["first"]),
                                           Number(display["second"]),
                                           display["operator"]);
    }
    else if (!isNaN(Number(input)) && !display["operator"]) {
        // If not first digit, add digits to first number
        if (display["first"]) {
            display["first"] += input;
        }
        // If first digit
        else {
            display["first"] = input;
        }
        // Update display
        displayValue.textContent += input;
    }
    // When number is clicked after operator has been selected
    else if (!isNaN(Number(input)) && display["operator"]) {
        // If not first digit, add digits to second number
        if (display["second"]) {
            display["second"] += input;
        }
        // If first digit
        else {
            display["second"] = input;
        }
        // Update display
        displayValue.textContent += input;
    }
    // When operator is clicked after digits on left side of operation have been selected
    else if (display["first"] && OPERATOR_SYMBOLS.includes(input) && !display["operator"]) {
        // Store operator
        display["operator"] = input;
        // Update display
        displayValue.textContent += (" " + display["operator"] + " ");
    }
    else if (display["first"] && display["second"] && display["operator"]) {
        display["first"] = operate(Number(display["first"]),
                                   Number(display["second"]),
                                   display["operator"])
        display["operator"] = input;
        delete display["second"];
        displayValue.textContent = display["first"] + " " + display["operator"] + " ";

    }
})

const OPERATOR_SYMBOLS = "+-x/"

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
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "x":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
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
