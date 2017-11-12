let displayOutput = "";

let operations = "+-/x";

let keyEntry = 0;

let enteredKeys = "";

let num1 = "";

let num2 = "";

let operator = "";

let displayNumbering = "";

let computation = "";

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return num1 + num2;
      break;
    case "-":
      return num1 - num2;
      break;
    case "x":
      return num1 * num2;
      break;
    case "/":
      return num1 / num2;
      break;
    case "=":
      return num1 = computation
      break;
    default:
      return "That is not a valid operator!";
  }
}

let numericalsList = document.getElementsByClassName("numericals");

for (i = 0; i < numericalsList.length; i++) {
  numericalsList[i].addEventListener("click", displayData);
}

let operatorsList = document.getElementsByClassName("operators");

for (i = 0; i < operatorsList.length; i++) {
  operatorsList[i].addEventListener("click", displayData);
}

document.getElementById("equals").addEventListener("click", displayData)

document.getElementById("backspace").addEventListener("click", removeNumber)

document.getElementById("clear").addEventListener("click", displayClear);


function displayData() {
  let keyValue = this.getAttribute("value");

  //Checks if keyValue is number

  if (keyValue.match(/[0-9]/gi)) {
    for (i = 0; i < operatorsList.length; i++) {
      operatorsList[i].disabled = false;
    }
    document.getElementById("backspace").disabled = false;
    enteredKeys += keyValue;
    displayOutput += keyValue;
    if(displayNumbering === '') {
    displayNumbering = keyValue;
    } else if(operator === '') {
      displayNumbering += keyValue
    } else {
    previousOperator = operator;
    displayNumbering = displayOutput.slice(displayOutput.lastIndexOf(previousOperator) + 1,displayOutput.length);
    }
    document.getElementById("displayNumber").innerHTML = displayNumbering;

    //Checks if keyValue is decimal
  } else if (keyValue === ".") {
    enteredKeys += keyValue;
    displayOutput += keyValue;
    this.disabled = true;
    document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 10), displayOutput.length + 1);
    document.getElementById("displayNumber").innerHTML = displayNumbering;

    //Checks if keyValue is an operator
  } else if (operations.includes(keyValue)) {
    for (i = 0; i < operatorsList.length; i++) {
      operatorsList[i].disabled = true;
    }

    //Checks if num1 value contains any data - if no, then assign num1

    if (num1 === "") {
      document.getElementById("decimal").disabled = false;
      num1 = enteredKeys;
      displayNumbering = enteredKeys;
      displayOutput += keyValue;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 10), displayOutput.length + 1);
      document.getElementById("displayNumber").innerHTML = displayNumbering;
      operator = keyValue;

      //Checks if num2 value contains any data - if no, then assign num2
    } else if (num2 === "") {
      previousOperator = operator;
      num2 = displayOutput.slice(
        displayOutput.lastIndexOf(previousOperator) + 1,
        displayOutput.length
      );
      displayNumbering = num2;
      computation = operate(previousOperator, Number(num1), Number(num2));
      document.getElementById("displayNumber").innerHTML = computation;
      operator = keyValue;
      displayOutput += keyValue;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 10), displayOutput.length + 1);

      //Creates calculation if both num1 and num2 have values
    } else {
      num1 = computation;
      previousOperator = operator;
      num2 = displayOutput.slice(
        displayOutput.lastIndexOf(previousOperator) + 1,
        displayOutput.length
      );
      computation = operate(previousOperator, Number(num1), Number(num2));
      document.getElementById("displayNumber").innerHTML = computation;
      operator = keyValue;
      displayOutput += keyValue;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 10), displayOutput.length + 1);
    }
  } else if(keyValue === '=') {
    document.getElementById("backspace").disabled = true
    if (num2 === "") {
      previousOperator = operator;
      num2 = displayOutput.slice(
        displayOutput.lastIndexOf(previousOperator) + 1,
        displayOutput.length
      );
      displayNumbering = num2;
      computation = operate(previousOperator, Number(num1), Number(num2));
      document.getElementById("displayNumber").innerHTML = computation;
      operator = keyValue;
      displayOutput += keyValue + computation;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 10), displayOutput.length + 1);

      //Creates calculation if both num1 and num2 have values
    } else {
      num1 = computation;
      previousOperator = operator;
      num2 = displayOutput.slice(displayOutput.lastIndexOf(previousOperator) + 1,displayOutput.length);
      computation = operate(previousOperator, Number(num1), Number(num2));
      document.getElementById("displayNumber").innerHTML = computation;
      operator = keyValue;
      displayOutput += keyValue + computation;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 10), displayOutput.length + 1);
      num1 = computation
      num2 = ''
    }
}
}

//Function to clear data entry

function displayClear() {
  displayOutput = "";
  enteredKeys = "";
  num1 = "";
  num2 = "";
  operator = "";
  displayNumbering = "";
  computation = "";
  document.getElementById("decimal").disabled = false;
  document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 10), displayOutput.length + 1);
  document.getElementById("displayNumber").innerHTML = displayNumbering;
  for (i = 0; i < operatorsList.length; i++) {
    operatorsList[i].disabled = false;
  }
}

//Function to backspace input data

function removeNumber() {
  displayNumbering = displayNumbering.slice(0, displayNumbering.length - 1)
  document.getElementById("displayNumber").innerHTML = displayNumbering;
}