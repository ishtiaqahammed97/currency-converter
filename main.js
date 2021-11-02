const select = document.querySelectorAll("select")
const input = document.querySelectorAll("input")
const initialCurrencyElm = document.querySelector(".initial-currency")
const convertedCurrencyElm = document.querySelector(".converted-currency")
const API_KEY = "https://freecurrencyapi.net/api/v2/latest?apikey=6a9fea60-3971-11ec-96f8-a5a12b22b8f7";
let html = '';

/// fetching data fom API
async function currencyFetching() {
    const res = await fetch(API_KEY)
    const data = await res.json();
    // console.log(data.data);
    /// get keys
    const keys = Object.keys(data.data);
    const currencyRates = data.data;
    /// show and populate dynamically select currency
    selectCurrency(keys);

    // take input and calculate
    calculateData(currencyRates)
};

currencyFetching()

function selectCurrency(dataKeys) {
    dataKeys.map(items => {
        return html += `<option value=${items}>${items}</option>`
    })
    /// show data
    for (let i = 0; i < select.length; i++) {
        select[i].innerHTML = html;
    }
}

function calculateData(currencyRates) {
    /// event listener will invoke when the input change
    input[0].addEventListener("keyup", () => {
        input[1].value = input[0].value * currencyRates[select[1].value] / currencyRates[select[0].value]
    });

    input[1].addEventListener("keyup", () => {
        input[0].value = input[1].value * currencyRates[select[0].value] / currencyRates[select[1].value]
    })

    /// event listener will invoke when the currency change
    select[0].addEventListener("change", () => {
        input[1].value = input[0].value * currencyRates[select[1].value] / currencyRates[select[0].value];
    });

    select[1].addEventListener("change", () => {
        input[0].value = input[1].value * currencyRates[select[0].value] / currencyRates[select[1].value]
    })
}