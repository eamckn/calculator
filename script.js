// Eamon McKeon
// JS for calculator project


const OPERATOR_SYMBOLS = "+-x/"

const displayValue = document.querySelector("#display");
const buttonList = document.querySelector("#button-container");

let display = {};

buttonList.addEventListener('click', (event) => {
    let input = event.target.textContent;
    // Clicking decimal
    if (input === ".") {
        if (!firstNumberExists()) {
            if (resultExists()) {
                clearDisplay();
            }
            display["first"] = input;
            displayValue.textContent += input;
        }
        else if (!display["first"].includes(input) && !operatorExists()) {
            display["first"] += input;
            displayValue.textContent += input;
        }
        else if (!secondNumberExists() && operatorExists()) {
            display["second"] = input;
            displayValue.textContent += input;
        }
        else if (operatorExists() && !display["second"].includes(input)) {
            display["second"] += input;
            displayValue.textContent += input;
        }
    }
    // Clicking backspace
    else if (input === "B" && !resultExists()) {
        if (secondNumberExists()) {
            display["second"] = display["second"].slice(0, -1);
            if (display["second"] === "") {
                delete display["second"];
            }
        }
        else if (operatorExists()) {
            delete display["operator"];
        }
        else if (firstNumberExists()) {
            display["first"] = display["first"].slice(0, -1);
            if (display["first"] === "") {
                delete display["first"];
            }
        }
        backspaceDisplay();
    }
    // Clearing display and object key-value pairs
    else if (input === "C") {
        clearEquationFields();
        if (resultExists()) {
            clearResult();
        }
        clearDisplay();
    }
    // Filled equation and equals is clicked
    else if (input === "=" && equationIsFilled()) {
        let result;
        result = roundToEight(operate(Number(display["first"]),
                                           Number(display["second"]),
                                           display["operator"]));
        if (isNaN(result)) {
            alert("ERROR: Cannot divide by 0.");
            clearEquationFields();
            clearDisplay();
        }
        else {
            displayValue.textContent = result;
            display["result"] = result.toString();
            clearEquationFields();
        }
    }
    // Clicking an operator after clicking equals
    else if (resultExists() && OPERATOR_SYMBOLS.includes(input)) {
        display["first"] = display["result"];
        clearResult();
        display["operator"] = input;
        displayValue.textContent += display["operator"];

    }
    // Populate numbers for left side of operator
    else if (!isNaN(Number(input)) && !operatorExists()) {
        if (resultExists()) {
            clearResult();
        }
        if (firstNumberExists()) {
            display["first"] += input;
            displayValue.textContent += input;
        }
        else {
            display["first"] = input;
            displayValue.textContent = input;
        }
    }
    // Populating numbers for right side of operator
    else if (!isNaN(Number(input)) && operatorExists()) {
        if (secondNumberExists()) {
            display["second"] += input;
        }
        else {
            display["second"] = input;
        }
        displayValue.textContent += input;
    }
    // Selecting the operator
    else if (firstNumberExists() && OPERATOR_SYMBOLS.includes(input) 
                                 && !operatorExists()
                                 && !(secondNumberExists())) {
        display["operator"] = input;
        displayValue.textContent += display["operator"];
    }
    // Evaluating current equation when an operator is clicked after the second number
    else if (equationIsFilled() && OPERATOR_SYMBOLS.includes(input)) {
        let result;
        result = roundToEight(operate(Number(display["first"]),
                                           Number(display["second"]),
                                           display["operator"]));
        if (isNaN(result)) {
            alert("ERROR: Cannot divide by 0.");
            clearEquationFields();
            clearDisplay();
        }
        else {
            display["first"] = result.toString();
            display["operator"] = input;
            delete display["second"];
            displayValue.textContent = display["first"] + display["operator"];
        }
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
    if (num2 === 0) {
        return NaN;
    }
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

function roundToEight(num) {
    return Math.round(num * 100000000) / 100000000;
}

function clearEquationFields() {
    delete display["first"];
    delete display["second"];
    delete display["operator"];
}

function clearResult() {
    delete display["result"];
}

function clearDisplay() {
    displayValue.textContent = "";
}

function firstNumberExists() {
    return "first" in display;
}

function operatorExists() {
    return "operator" in display;
}

function secondNumberExists() {
    return "second" in display;
}

function resultExists() {
    return "result" in display;
}

function equationIsFilled() {
    return firstNumberExists() && operatorExists() && secondNumberExists();
}

function backspaceDisplay() {
    displayValue.textContent = displayValue.textContent.slice(0, -1);
}