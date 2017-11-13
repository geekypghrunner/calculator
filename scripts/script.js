let displayOutput = "";

let operations = "+-/x";

let num1 = "";

let num2 = "";

let operator = "";

let displayNumbering = "";

let computation = "";

let keyValue;

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

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "0":
      keyValue = "0"
      displayData()
      break;
    case "1":
      keyValue = "1"
      displayData()
      break;
    case "2":
      keyValue = "2"
      displayData()
      break;
    case "3":
      keyValue = "3"
      displayData()
      break;
    case "4":
      keyValue = "4"
      displayData()
      break;
    case "5":
      keyValue = "5"
      displayData()
      break;
    case "6":
      keyValue = "6"
      displayData()
      break;
    case "7":
      keyValue = "7"
      displayData()
      break;
    case "8":
      keyValue = "8"
      displayData()
      break;
    case "9":
      keyValue = "9"
      displayData()
      break;
    case "=":
      keyValue = "="
      displayData()
      break;
    case "Enter":
      keyValue = "="
      displayData()
      break;
    case "+":
      keyValue = "+"
      displayData()
      break;
    case "-":
      keyValue = "-"
      displayData()
      break;
    case "*":
      keyValue = "x"
      displayData()
      break;
    case "/":
      keyValue = "/"
      displayData()
      break;
    case "Backspace":
      removeNumber()
      break;
    case "Delete":
      displayClear()
      break;
    case ".":
      keyValue = "."
      displayData()
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);


function displayData() {

  //Checks if input was keyed or clicked

  if(this.type === "button"){
    keyValue = this.getAttribute("value");
  }   

  //Checks if keyValue is number

  if (keyValue.match(/[0-9]/gi)) {
    for (i = 0; i < operatorsList.length; i++) {
      operatorsList[i].disabled = false;
    }
    document.getElementById("backspace").disabled = false;
    if(displayNumbering === '') {
    displayNumbering = keyValue;
    } else if(operator === '') {
      displayNumbering += keyValue
    } else {
    previousOperator = operator;
    displayNumbering += keyValue;
    }
    document.getElementById("displayNumber").innerHTML = displayNumbering;

    //Checks if keyValue is decimal
  } else if (keyValue === ".") {
    displayNumbering += keyValue;
    this.disabled = true;
    document.getElementById("displayNumber").innerHTML = displayNumbering;

    //Checks if keyValue is an operator
  } else if (operations.includes(keyValue)) {
    for (i = 0; i < operatorsList.length; i++) {
      operatorsList[i].disabled = true;
    }

    //Checks if num1 value contains any data - if no, then assign num1

    if (num1 === "") {
      document.getElementById("decimal").disabled = false;
      num1 = displayNumbering;
      displayOutput = displayNumbering+keyValue;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 9), displayOutput.length + 1);
      document.getElementById("displayNumber").innerHTML = displayNumbering;
      operator = keyValue;
      displayNumbering = ''

      //Checks if num2 value contains any data - if no, then assign num2
    } else if (num2 === "") {
      previousOperator = operator;
      num2 = displayNumbering;
      computation = operate(previousOperator, Number(num1), Number(num2));
      document.getElementById("displayNumber").innerHTML = computation;
      operator = keyValue;
      displayOutput += num2+keyValue;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 9), displayOutput.length + 1);
      displayNumbering = ''


      //Creates calculation if both num1 and num2 have values
    } else {
      num1 = computation;
      previousOperator = operator;
      num2 = displayNumbering;
      computation = operate(previousOperator, Number(num1), Number(num2));
      document.getElementById("displayNumber").innerHTML = computation;
      operator = keyValue;
      displayOutput += num2+keyValue;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 9), displayOutput.length + 1);
      displayNumbering = ''


    }
  } else if(keyValue === '=') {
    document.getElementById("backspace").disabled = true
    if (num2 === "") { 
      previousOperator = operator;
      num2 = displayNumbering;
      computation = operate(previousOperator, Number(num1), Number(num2));
      document.getElementById("displayNumber").innerHTML = computation;
      operator = keyValue;
      displayOutput += num2 + keyValue + computation;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 9), displayOutput.length + 1);
      displayNumbering = ''



      //Creates calculation if both num1 and num2 have values
    } else {
      num1 = computation;
      previousOperator = operator;
      num2 = displayNumbering;
      computation = operate(previousOperator, Number(num1), Number(num2));
      document.getElementById("displayNumber").innerHTML = computation;
      operator = keyValue;
      displayOutput += num2+keyValue + computation;
      document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 9), displayOutput.length + 1);
      num1 = computation
      num2 = ''
      displayNumbering = ''

    }
}
}

//Function to clear data entry

function displayClear() {
  displayOutput = "";
  num1 = "";
  num2 = "";
  operator = "";
  displayNumbering = "";
  computation = "";
  document.getElementById("decimal").disabled = false;
  document.getElementById("displayString").innerHTML = displayOutput.substring((displayOutput.length - 9), displayOutput.length + 1);
  document.getElementById("displayNumber").innerHTML = displayNumbering;
  for (i = 0; i < operatorsList.length; i++) {
    operatorsList[i].disabled = false;
  }
}

//Function to backspace input data

function removeNumber() {
  displayNumbering = displayNumbering.slice(0, -1)
  document.getElementById("displayNumber").innerHTML = displayNumbering;
}

