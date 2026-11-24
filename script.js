
let firstNumber = "";
let operator = null;
let secondNumber = "";


const add = function(a,b) {
    return a + b ;
}

const sub = function(a,b) {
    return a - b ;

}
const multiply = function(a,b) {
    return a * b;
}
const division = function(a,b) {
    return a / b ;
}

const operate = function(operator, num1,num2) {
   num1 = Number(num1);
   num2 = Number(num2);
   
   if (operator === "+" ) {
     return  add(num1, num2);
   }
    else if (operator === "-") {
        return sub(num1, num2);
    }
    else if (operator === "*") {
         return multiply(num1, num2);
    }
    else if (operator === "/") {
         return division(num1 , num2);
    }
      else  {
        return null;
     }
    
    }

const display = document.querySelector(".display");
const keypad = document.querySelectorAll(".number");
const buttonoperator = document.querySelectorAll(".operator");
const equalsbutton = document.querySelector(".equals");
const clearButton =  document.querySelector(".clear");

function updateDisplay() {
    if (firstNumber === "") {
        display.textContent = "0";
        return;
    }

    // Format operator symbols so they look clean on screen (× and ÷ instead of * and /)
    let displayOp = operator;
    if (operator === "*") displayOp = "×";
    if (operator === "/") displayOp = "÷";

    if (operator === null) {
        display.textContent = firstNumber;
    } else if (secondNumber === "") {
        display.textContent = `${firstNumber} ${displayOp}`;
    } else {
        display.textContent = `${firstNumber} ${displayOp} ${secondNumber}`;
    }
}

// Operator buttons click logic
/*buttonoperator.forEach(button =>        {
    button.addEventListener("click", () => {
        operator=button.dataset.op;
        console.log("selected operator:", operator);
    })
});


// Number buttons click logic

keypad.forEach(button => {
    button.addEventListener('click', () => 
        {
        const numbervalue = button.dataset.num;
        if(numbervalue === ".") {
            const currentTarget = operator === null ? firstNumber : secondNumber;
            if (currentTarget.includes(".")) return;
        }

        if (operator === null) {
            firstNumber += numbervalue;
            display.textContent = firstNumber;
        }
        else {
            secondNumber += numbervalue;
            display.textContent = secondNumber;
        }

        console.log("you clicked number:", numbervalue);
});
}); */
buttonoperator.forEach(button => {
    button.addEventListener("click", () => {
        // Prevent selecting an operator before typing a first number
        if (firstNumber === "") return;

        // If user already typed firstNumber, operator, and secondNumber, calculate first (chained math)
        if (operator !== null && secondNumber !== "") {
            const result = operate(operator, firstNumber, secondNumber);
            firstNumber = result.toString();
            secondNumber = "";
        }

        operator = button.dataset.op;
        updateDisplay();
    });
});

keypad.forEach(button => {
    button.addEventListener("click", () => {
        let numbervalue = button.dataset.num;

        // Prevent duplicate decimals
        if (numbervalue === ".") {
            const currentTarget = operator === null ? firstNumber : secondNumber;
            if (currentTarget.includes(".")) return;
        }

        if (operator === null) {
            firstNumber += numbervalue;
        } else {
            secondNumber += numbervalue;
        }

        updateDisplay();
    });
});

// Equals button click logic
equalsbutton.addEventListener("click", () => {
    if(firstNumber === "" || operator === null || secondNumber === "" )
        return;
 let result = operate(operator,  firstNumber, secondNumber);
 display.textContent = result;

 firstNumber = "";
 secondNumber = "";
 operator = null;
});

 // Equals button click logic

clearButton.addEventListener("click", () => {
    firstNumber = "";
    secondNumber = "";
    operator = null;
    display.textContent = "0";
 })



