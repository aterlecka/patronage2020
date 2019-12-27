window.onload = function () {

    let displayValue = "0";
    let pendingValue = "";
    let evalStringArray = [];
    let resultOnTheScreen = document.getElementById("result");
    let digitInCalculator = document.querySelectorAll(".number");
    let clearAllDigits = document.getElementById('clear');
    let operatorInCalculator = document.querySelectorAll(".operator");
    let deleteOneDigit = document.querySelector(".delete");
    let pointInCalculator = document.getElementById("point");
    let circle = document.getElementsByClassName("outer");



    let numberClick = (num) => {
        if (displayValue === '0')
            displayValue = '';
        displayValue += num;
        resultOnTheScreen.innerHTML = displayValue;
    };
    let updateDisplayValue = (clickObj) => {
        let btnText = clickObj.target.innerText;
        numberClick(btnText);
    };
    let performOperation = (clickObj) => {
        let operation = clickObj.target.innerText;
        switch (operation) {
            case '+':
                pendingValue = Number.parseFloat(displayValue);
                resultOnTheScreen.innerHTML = displayValue;
                displayValue = '';
                evalStringArray.push(pendingValue);
                evalStringArray.push('+');
                break;
            case '-':
                pendingValue = Number.parseFloat(displayValue);
                resultOnTheScreen.innerHTML = displayValue;
                displayValue = '';
                evalStringArray.push(pendingValue);
                evalStringArray.push('-');
                break;
            case '*':
                pendingValue = Number.parseFloat(displayValue);
                resultOnTheScreen.innerHTML = displayValue;
                displayValue = '';
                evalStringArray.push(pendingValue);
                evalStringArray.push('*');
                break;
            case '/':
                pendingValue = Number.parseFloat(displayValue);
                resultOnTheScreen.innerHTML = displayValue;
                displayValue = '';
                evalStringArray.push(pendingValue);
                evalStringArray.push('/');
                break;
            case '=':
                evalStringArray.push(displayValue);
                let resultEval = eval(evalStringArray.join(''));
                resultOnTheScreen.innerHTML = resultEval;
                displayValue = resultEval;
                pendingValue = displayValue;
                evalStringArray = [];
                displayValue = resultEval + '';
                break;
            default:
                break;
        }
    };
    for (let i = 0; i < digitInCalculator.length; i++) {
        digitInCalculator[i].addEventListener('click', updateDisplayValue, false);
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

    pointInCalculator.onclick = () => {
        if (displayValue === '')
            displayValue += '0';
        displayValue += ".";
        resultOnTheScreen.innerHTML = displayValue;
    };
};











