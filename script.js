// Eamon McKeon
// JS for calculator project


const OPERATOR_SYMBOLS = "+-x/"

const displayValue = document.querySelector("#display");
const buttonList = document.querySelector("#button-container");

let display = {};

buttonList.addEventListener('click', (event) => {
    let input = event.target.textContent;
    // When nothing has been clicked and the clicked button is a number
    if (input === "C") {
        clearEquationFields();
        if ("result" in display) {
            delete display["result"];
        }
        displayValue.textContent = "";
    }
    if (input === "=" && isFirstNumber() && isOperator() && isSecondNumber()) {
        let result;
        result = roundToTen(operate(Number(display["first"]),
                                           Number(display["second"]),
                                           display["operator"]));
        displayValue.textContent = result;
        display["result"] = result;
        clearEquationFields();
    }
    else if (display["result"] && OPERATOR_SYMBOLS.includes(input)) {
        display["first"] = display["result"];
        delete display["result"];
        display["operator"] = input;
        displayValue.textContent += (" " + display["operator"] + " ");

    }
    else if (!isNaN(Number(input)) && !display["operator"]) {
        if (display["result"]) {
            delete display["result"];
        }
        // If not first digit, add digits to first number
        if (isFirstNumber()) {
            display["first"] += input;
            // Update display
            displayValue.textContent += input;
        }
        // If first digit
        else {
            display["first"] = input;
            displayValue.textContent = input;
        }
    }
    // When number is clicked after operator has been selected
    else if (!isNaN(Number(input)) && isOperator()) {
        // If not first digit, add digits to second number
        if (isSecondNumber()) {
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
    else if (isFirstNumber() && OPERATOR_SYMBOLS.includes(input) && !(isSecondNumber())) {
        // Store operator
        display["operator"] = input;
        // Update display
        displayValue.textContent += (" " + display["operator"] + " ");
    }
    else if (isFirstNumber() && isSecondNumber() && isOperator()) {
        display["first"] = roundToTen(operate(Number(display["first"]),
                                   Number(display["second"]),
                                   display["operator"]));
        display["operator"] = input;
        delete display["second"];
        displayValue.textContent = display["first"] + " " + display["operator"] + " ";
    }
})

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
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

function roundToTen(num) {
    return Math.round(num * 10000000000) / 10000000000;
}

function clearEquationFields() {
    delete display["first"];
    delete display["second"];
    delete display["operator"];
}

function isFirstNumber() {
    return "first" in display;
}

function isOperator() {
    return "operator" in display;
}

function isSecondNumber() {
    return "second" in display;
}