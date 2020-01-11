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
    let equalResult = document.querySelector(".equal");

    let displayValueOnScreen = (num) => {

        let lastElementInDisplayValue = returnLastElementInDisplay();

        if (displayValue === "0") {
            displayValue = "";
        }
        if (validateLastElement(lastElementInDisplayValue, num)) {
            displayValue += num;
        }
        resultOnTheScreen.innerHTML = displayValue;
    };

    let returnLastElementInDisplay = () => {
        let lastElementInDisplayValue;

        if (displayValue !== "") {
            lastElementInDisplayValue = displayValue.charAt(displayValue.length - 1);
        } else {
            lastElementInDisplayValue = " ";
        }
        return lastElementInDisplayValue;
    };

    let validateLastElement = (lastElementInDisplayValue, num) => {
        let operators = '+-/*';
        let isLastElementAnOperator = operators.indexOf(lastElementInDisplayValue) > -1;
        let isNumAnOperator = operators.indexOf(num) > -1;

        return !(isLastElementAnOperator && isNumAnOperator);

    };

    let updateDisplayValue = (clickObj) => {
        let btnText = clickObj.target.innerText;
        displayValueOnScreen(btnText);
    };

    let parseCalculationString = (s) => {
        let calculation = [],
            current = '';
        console.log(typeof resultOnTheScreen.innerHTML)

        for (let i = 0, ch; ch = s.charAt(i); i++) {
            if ('+-/*'.indexOf(ch) > -1) {
                if (current == '' && ch == '') {
                    current = '';
                } else {
                    calculation.push(parseFloat(current), ch);
                    current = '';
                }
            } else {
                current += s.charAt(i);
            }
        }
        if (current != '') {
            calculation.push(parseFloat(current));
        }

        return calculation;
    };

    let calculate = (calc) => {
        let operators = [{'*': (a, b) => a * b, '/': (a, b) => a / b},
                {'+': (a, b) => a + b, '-': (a, b) => a - b}],
            newCalc = [],
            currentOperator;
        for (let i = 0; i < operators.length; i++) {
            for (let j = 0; j < calc.length; j++) {
                if (operators[i][calc[j]]) {
                    currentOperator = operators[i][calc[j]];
                } else if (currentOperator) {
                    newCalc[newCalc.length - 1] =
                        currentOperator(newCalc[newCalc.length - 1], calc[j]);
                    currentOperator = null;
                } else {
                    newCalc.push(calc[j]);
                }
                console.log(newCalc);
            }
            calc = newCalc;
            newCalc = [];
        }
        if (calc.length > 1) {
            console.log('Error');
            return calc;
        } else {
            return calc[0].toString();
        }
    };

    for (let i = 0; i < digitOnCalculator.length; i++) {
        digitOnCalculator[i].addEventListener('click', updateDisplayValue, false);
    }
    for (let i = 0; i < operatorInCalculator.length; i++) {
        operatorInCalculator[i].addEventListener('click', updateDisplayValue, false);
    }

    equalResult.onclick = () => {
        resultOnTheScreen.innerHTML = calculate(parseCalculationString(resultOnTheScreen.innerHTML));
        displayValue = resultOnTheScreen.innerHTML;
    };

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
    }
};
