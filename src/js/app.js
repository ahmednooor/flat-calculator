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
    if ((key.charCode < 40 || key.charCode > 57) && (key.charCode !== 13 && key.charCode !== 99)) {
        return false;
    } else if (key.charCode === 42 || key.charCode === 47 || key.charCode === 43 || key.charCode === 45) {
        key.preventDefault();
        if (key.charCode === 42) {
            display.value += "*";
        } else if (key.charCode === 47) {
            display.value += "/";
        } else if (key.charCode === 43) {
            display.value += "+";
        } else if (key.charCode === 45) {
            display.value += "-";
        }
        return true;
    } else if (key.charCode === 13) {
        key.preventDefault();
        displayResult();
        return true;
    } else if (key.charCode === 99) {
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
