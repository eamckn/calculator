// Eamon McKeon
// JS for calculator project


const OPERATOR_SYMBOLS = "+-x/"

const displayValue = document.querySelector("#display");
const buttonList = document.querySelector("#button-container");

let display = {};

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