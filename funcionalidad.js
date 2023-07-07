/*
//Declaramos variables 
var operandoa;
var operandob;
var operacion;

function init(){
  //variables
  var resultado = document.getElementById('resultado');
  var reset = document.getElementById('reset');
  var suma = document.getElementById('suma');
  var resta = document.getElementById('resta');
  var multiplicacion = document.getElementById('multiplicacion');
  var division = document.getElementById('division');
  var igual = document.getElementById('igual');
  var uno = document.getElementById('uno');
  var dos = document.getElementById('dos');
  var tres = document.getElementById('tres');
  var cuatro = document.getElementById('cuatro');
  var cinco = document.getElementById('cinco');
  var seis = document.getElementById('seis');
  var siete = document.getElementById('siete');
  var ocho = document.getElementById('ocho');
  var nueve = document.getElementById('nueve');
  var cero = document.getElementById('cero');
}

//Eventos de click
  uno.onclick = function(e){
      resultado.textContent = resultado.textContent  + "1";
  }
  dos.onclick = function(e){
      resultado.textContent = resultado.textContent  + "2";
  }
  tres.onclick = function(e){
      resultado.textContent = resultado.textContent  + "3";
  }
  cuatro.onclick = function(e){
      resultado.textContent = resultado.textContent  + "4";
  }
  cinco.onclick = function(e){
      resultado.textContent = resultado.textContent  + "5";
  }
  seis.onclick = function(e){
      resultado.textContent = resultado.textContent  + "6";
  }
  siete.onclick = function(e){
      resultado.textContent = resultado.textContent  + "7";
  }
  ocho.onclick = function(e){
      resultado.textContent = resultado.textContent  + "8";
  }
  nueve.onclick = function(e){
      resultado.textContent = resultado.textContent  + "9";
  }
  cero.onclick = function(e){
      resultado.textContent = resultado.textContent  + "0";
  }
  reset.onclick = function(e){
      resetear();
  }
  suma.onclick = function(e){
      operandoa = resultado.textContent;
      operacion = "+";
      limpiar();
  }
  resta.onclick = function(e){
      operandoa = resultado.textContent;
      operacion = "-";
      limpiar();
  }
  multiplicacion.onclick = function(e){
      operandoa = resultado.textContent;
      operacion = "*";
      limpiar();
  }
  division.onclick = function(e){
      operandoa = resultado.textContent;
      operacion = "/";
      limpiar();
  }
  igual.onclick = function(e){
      operandob = resultado.textContent;
      resolver();
  }

function limpiar(){
  resultado.textContent = "";
}

function resetear(){
  resultado.textContent = "";
  operandoa = 0;
  operandob = 0;
  operacion = "";
}

function resolver(){
  var res = 0;
  switch(operacion){
    case "+":
      res = parseFloat(operandoa) + parseFloat(operandob);
      break;

    case "-":
        res = parseFloat(operandoa) - parseFloat(operandob);
        break;

    case "*":
      res = parseFloat(operandoa) * parseFloat(operandob);
      break;

    case "/":
      res = parseFloat(operandoa) / parseFloat(operandob);
      break;
  }
  resetear();
  resultado.textContent = res;
}
*/
const btnSwitch = document.querySelector("#switch");

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
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

//selecting display
const display = document.querySelector('.display')
//selecting all numbers
const numbers = document.querySelectorAll('.number')
//adding event listener for each number in "numbers"
numbers.forEach( (button) => {
    button.addEventListener('click', calculate)
})
//selecting all operators
const operators = document.querySelectorAll('.operator')
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
                        } else if (keyValue == "⌫") {
                            back()
                        } else if (keyValue == "=") {
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
    else if (buttonValue == '=') {
        equal() //calling the equal() function
    }
    else if (buttonValue == "⌫") {
        back() //calling the back() function
    }
    else if (buttonValue == "C") {
        clean() //calling the clean() function
    }
    
}