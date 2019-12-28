window.onload = function () {

    let displayValue = "0";
    let pendingValue = "";
    let evalStringArray = [];
    let resultOnTheScreen = document.getElementById("result");
    let digitOnCalculator = document.querySelectorAll(".number");
    let clearAllDigits = document.querySelector(".clear");
    let operatorInCalculator = document.querySelectorAll(".operator");
    let deleteOneDigit = document.querySelector(".delete");
    let dotOnCalculator = document.getElementById("dot");

    let displayValueOnScreen = (num) => {
        if (displayValue === "0")
            displayValue = "";
        displayValue += num;
        resultOnTheScreen.innerHTML = displayValue;
    };

    let updateDisplayValue = (clickObj) => {
        let btnText = clickObj.target.innerText;
        displayValueOnScreen(btnText);
    };

    let performOperation = (clickObj) => {
        const PLUS = "+";
        const MINUS = "-";
        const DIVIDE = "/";
        const MULTIPLY = "*";
        const EQUALS = "=";
        let operation = clickObj.target.innerText;

        switch (operation) {
            case PLUS:
                addValueToEvalString(PLUS);
                break;
            case MINUS:
                addValueToEvalString(MINUS);
                break;
            case MULTIPLY:
                addValueToEvalString(MULTIPLY);
                break;
            case DIVIDE:
                addValueToEvalString(DIVIDE);
                break;
            case EQUALS:
                evalStringArray.push(displayValue);
                let resultEval = eval(evalStringArray.join(''));
                resultOnTheScreen.innerHTML = resultEval;
                displayValue = resultEval;
                pendingValue = displayValue;
                evalStringArray = [];
                displayValue = resultEval + "";
                break;
            default:
                break;
        }
    };

    let addValueToEvalString = (selectedOperator) => {
        pendingValue = Number.parseFloat(displayValue);
        resultOnTheScreen.innerHTML = displayValue;
        displayValue = "";
        evalStringArray.push(pendingValue);
        evalStringArray.push(selectedOperator);
    };

    for (let i = 0; i < digitOnCalculator.length; i++) {
        digitOnCalculator[i].addEventListener('click', updateDisplayValue, false);
    }
    for (let i = 0; i < operatorInCalculator.length; i++) {
        operatorInCalculator[i].addEventListener('click', performOperation, false);
    }

    clearAllDigits.onclick = () => {
        displayValue = '0';
        pendingValue = undefined;
        evalStringArray = [];
        resultOnTheScreen.innerHTML = displayValue;
    };

    deleteOneDigit.onclick = () => {
        let lengthOfDisplayVal = displayValue.length;
        displayValue = displayValue.slice(0, lengthOfDisplayVal - 1);
        resultOnTheScreen.innerHTML = displayValue;
    };

    dotOnCalculator.onclick = () => {
        if (displayValue === '')
            displayValue += '0';
        displayValue += ".";
        resultOnTheScreen.innerHTML = displayValue;
    };
};











