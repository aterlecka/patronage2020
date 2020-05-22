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
    let valueFromFetch;

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
        let operators = '+-/*^√';
        let isLastElementAnOperator = operators.indexOf(lastElementInDisplayValue) > -1;
        let isNumAnOperator = operators.indexOf(num) > -1;
        return !(isLastElementAnOperator && isNumAnOperator);
    };

    let updateDisplayValue = (clickObj) => {
        let btnText = clickObj.target.innerText;
        displayValueOnScreen(btnText);
    };

    let convertValueToPLN = (valueToConvert) => {
        let codeAndValue = splitCodeFromAmount(valueToConvert);
        let currencyCode = codeAndValue[0][0];
        let currencyAmount = codeAndValue[0][1];
        return multiply(currencyAmount, valueForCurrency(currencyCode));
    };

    let splitCodeFromAmount = (valueToSplit) => {
        let codeAndValue = [];
        let toArray = valueToSplit.split(' ');
        toArray.forEach(function (item) {
            codeAndValue.push(item.replace(/\'/g, '').split(/(\d+)/).filter(Boolean));
        });
        return codeAndValue;
    };

    let valueForCurrency = (currencyCode) => {
        for (let i = 0; i < valueFromFetch[0].rates.length; i++) {
            let ratez = valueFromFetch[0].rates;
            if (currencyCode.indexOf(ratez[i].code) > -1) {
                let valueForCurrent = ratez[i].mid;
                return valueForCurrent;
            }
        }
    };

    let multiply = (currencyAmount, currencyValue) => {
        return currencyAmount * currencyValue;
    };

    let parseCalculationString = (s) => {
        let divideInputValueToTypes = [],
            current = '';
        let codesArray = ["THB", "USD", "AUD", "HKD", "CAD", "NZD", "SGD", "EUR", "HUF", "CHF", "GBP", "UAH", "JPY",
            "CZK", "DKK", "ISK", "NOK", "SEK", "HRK", "RON", "BGN", "TRY", "ILS", "CLP", "PHP", "MXN", "ZAR", "BRL",
            "MYR", "RUB", "IDR", "INR", "KRW", "CNY", "XDR"];

        for (let i = 0, ch; ch = s.charAt(i); i++) {

            if ('+-/*^√'.indexOf(ch) > -1) {
                if (current == '' && ch == '') {
                    current = '';
                } else {
                    if (current.indexOf(s)) {


                        let subCurrent = current;
                        codesArray.forEach(code => {
                            if (subCurrent.indexOf(code) > -1) {
                                current = convertValueToPLN(current);
                            }
                        });
                    }
                    divideInputValueToTypes.push(parseFloat(current), ch);
                    current = '';
                }
            } else {
                current += s.charAt(i);
            }
        }
        let secondSubCurrent = current;

        codesArray.forEach(element => {
            if (secondSubCurrent.indexOf(element) > -1) {
                current = convertValueToPLN(current);
            }
        });

        if (current != '') {
            divideInputValueToTypes.push(parseFloat(current));
        }
        return divideInputValueToTypes;
    };

    let calculate = (calc) => {
        let operators = [{'^': (a, b) => Math.pow(a, b)},
                {"√": (a, b) => Math.pow(b, 1 / a)},
                {'*': (a, b) => a * b, '/': (a, b) => a / b},
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
                    newCalc.push(calc[j]); //[55.0]
                }
            }
            calc = newCalc;
            newCalc = [];
        }
        if (calc.length > 1) {
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
    };

    const app = document.getElementById('dropdown');
    const container = document.getElementById("dropdown-content");
    app.appendChild(container);

    fetch('http://api.nbp.pl/api/exchangerates/tables/A/?format=json')
        .then(resp => resp.json())
        .then(resp => {
            valueFromFetch = resp;

            resp[0].rates.forEach(rates => {
                const card = document.createElement('button');
                card.setAttribute('value', card.textContent = rates.mid);
                card.setAttribute('class', 'btn btn-raised btn-info');
                card.textContent = rates.code;
                container.appendChild(card);
                card.onclick = (clickObj) => {
                    let btnText = clickObj.target.innerText;
                    displayValueOnScreen(btnText);
                };
            })
        })
        .catch(error => console.log('Blad: ', error) + alert('Blad podczas pobierania danych'));
}
