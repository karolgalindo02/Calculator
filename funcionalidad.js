const label = document.querySelector('.switch-label')
const modeSwitch = document.getElementById('switch');
const switchToggle = document.getElementById('.switch-toggle');
const body = document.body;
const ENTER_KEY = "Enter"
const DELETE_KEY = "Delete"
const display = document.querySelector('.display') //selecting display
const numbers = document.querySelectorAll('.number') //selecting all numbers
const operators = document.querySelectorAll('.operator, .operator-start, .operator-end') //selecting all operators

//turn light mode
modeSwitch.addEventListener('change', function() {
  body.classList.toggle('light-mode');
});

//change name if label is checked
modeSwitch.addEventListener('change', function() {
  if (modeSwitch.checked) {
    label.textContent = 'Dark Mode';
  } else {
    label.textContent = 'Light Mode';
  }
});

function insert(num) {
    //if there is syntax error, return the function
    if(SyntaxError) { 
        return
    }
    
    // insert a number into the display
    if(display.value.length < 20) {
      
        if(isNaN(num)) {
            display.value += num
        }
        else if(display.value.length == 1 && display.value[0] == 0) {
            display.value = num
        }
        else {
            display.value += num
        }
    }
    else {
        return
    }
}

function clean() {
    //if there is a syntax error, toggle the variable to false (reset)
    SyntaxError = false
    //clear the display value 
    display.value = "0";

}

function equal() {
    var exp = display.value
    var flag = false //boolean variable to check condicionals 

    for(i = 0; i < exp.length; i++) {
        if(isNaN(exp[i]) && isNaN(exp[i+1])) {
            if(exp[i] != "+" && exp[i] != "-") {
                //if there are two operators together, toggle syntaxerror to true
                display.value = "Syntax Error"
                SyntaxError = true
            }

        }
    }

    if(flag == false) { //if there is no  errors, calculate the expression normaly
        var answer = eval(exp)

        if(isFinite(answer)) {
            display.value = answer
        }
        else {
            display.value = "Math Error" // if is infinity 
            SyntaxError = true
        }
    }
   
    
}

function back() {
    //if there is syntax error, return the function
    if(SyntaxError) {
        return
    }

    display.value = display.value.substring(0,display.value.length-1)
    
    if(display.value == "") {
        display.value = "0"
    }

}

//adding event listener for each number in "numbers"
numbers.forEach( (button) => {
    button.addEventListener('click', calculate)
})

//adding event listener for each operator in "operators"
operators.forEach( (button) => {
    button.addEventListener('click', calculate)
})
// adding event listener to the keyboard
window.addEventListener('keypress', check)
function check(key) {
    let keyValue = key.key
    if (key.keyCode) {
        if(!isNaN(keyValue)) {
            insert(keyValue)
        } else { 
            if(display.value.length == 1 && display.value[0] == 0) {
                return
            } else {
                for(i = 0; i < operators.length; i++) {
                    if(keyValue == operators[i].value) {
                        if (keyValue == "C") {
                            clean()
                        } else if (keyValue == "⌫" || keyValue == DELETE_KEY) {
                            back()
                        } else if (keyValue == "=" || keyValue == ENTER_KEY) {
                            equal()
                        } else {
                            display.value += keyValue
                        }
                    }
                }
            } 
        }
    }
}

//boolean variable to check if there is syntax error
var SyntaxError = false

function calculate(event) {
    var buttonValue = event.target.value


    if (!isNaN(buttonValue) || (isNaN(buttonValue) && buttonValue != "=" && buttonValue != "⌫" && buttonValue != "C")) {
        if(buttonValue == "x") {
            buttonValue = "*" //changing the "x" into "*" to calculate normally
        }

        //insert the buttonValue 
        insert(buttonValue) 

    }
    else if (buttonValue == "=" ) {
        equal() //calling the equal() function
    }
    else if (buttonValue == "⌫" ) {
        back() //calling the back() function
    }
    else if (buttonValue == "C") {
        clean() //calling the clean() function
    }
    
}
