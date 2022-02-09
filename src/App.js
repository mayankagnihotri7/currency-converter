import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import CurrencyInput from "./CurrencyInput";

const BASE_URL = `http://api.exchangeratesapi.io/v1/latest`;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState(["INR"]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = fromAmount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  const getCurrencies = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}?access_key=${process.env.REACT_APP_API_ACCESS_KEY}&symbols=USD,EURO,SGD,AUD,GBP`
      );
      const firstCurrency = Object.keys(response?.data?.rates)[0];
      setCurrencyOptions(Object.keys(response?.data?.rates));
      setFromCurrency("INR");
      setToCurrency(firstCurrency);
      setExchangeRate(response?.data?.rates[firstCurrency]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      axios
        .get(
          `${BASE_URL}?access_key=${process.env.REACT_APP_API_ACCESS_KEY}&symbols=${toCurrency}`
        )
        .then((res) => setExchangeRate(res.data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyInput
        currencyOptions={baseCurrency}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <p>exchange rate is</p>
      <CurrencyInput
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
