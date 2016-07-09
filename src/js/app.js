// -- variables:
var display = document.getElementById('display'),
    inputs = document.getElementsByClassName('inputs'),
    operators = document.getElementsByClassName('operators'),
    equal = document.getElementById('equal'),
    clear = document.getElementById('clear'),
    backspace = document.getElementById('backspace'),
    currentInputValue,
    currentOperator,
    displayValue,
    result,
    backspaceValue,
    i,
    io;

// -- functions:
// for data(numberic values) input
function dataInput() {
    currentInputValue = this.value;
    display.value += currentInputValue;
}

// for operator(+-*/) input
function operatorInput() {
    currentOperator = this.value;
    display.value += currentOperator;
}

// for displaying the calculated result
function displayResult() {
    if (display.value === "") {
        display.value = "";
    } else {
        displayValue = display.value;
        displayValue = displayValue.replace(/[\d.]+/g, function (n) {
            return parseFloat(n);
        });
        result = eval(displayValue);
        display.value = result;
    }
}

// for deleting(backspace) single value
function deleteSingle() {
    backspaceValue = display.value;
    display.value = backspaceValue.substr(0, backspaceValue.length - 1);
}

// for clearing input field
function clearAll() {
    display.value = "";
}

// for blocking alphabets into input field and helping calculation through keyboard keys
function keyboardInput(key) {
    if ((key.which < 0 || key.which > 57) && (key.which !== 13 && key.which !== 99)) {
        return false;
    } else if (key.which === 42 || key.which === 47 || key.which === 43 || key.which === 45) {
        key.preventDefault();
        if (key.which === 42) {
            display.value += "*";
        } else if (key.which === 47) {
            display.value += "/";
        } else if (key.which === 43) {
            display.value += "+";
        } else if (key.which === 45) {
            display.value += "-";
        }
        return true;
    } else if (key.which === 13) {
        key.preventDefault();
        displayResult();
        return true;
    } else if (key.which === 99) {
        key.preventDefault();
        clearAll();
        return true;
    }
}

// -- code execution:
window.onload = function () {
    // -- function calling and stuff:
    // for blocking alphabets into input field and helping calculation through keyboard keys
    display.onkeypress = keyboardInput;

    // for data(numberic values) input
    for (i = 0; i < inputs.length; i++) {
        inputs[i].onclick = dataInput;
    }

    // for operator(+-*/) input
    for (io = 0; io < operators.length; io++) {
        operators[io].onclick = operatorInput;
    }

    // for displaying the calculated result
    equal.onclick = displayResult;

    // for deleting(backspace) single value
    backspace.onclick = deleteSingle;

    // for clearing input field
    clear.onclick = clearAll;
};
