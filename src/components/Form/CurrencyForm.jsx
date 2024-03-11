import { useState } from "react";
import { BsCurrencyExchange } from "react-icons/bs";
import Loader from "./Loader/Loader";
import AmountInput from "./AmountInput/AmountInput";
import CurrencySelection from "./CurrencySelection/CurrencySelection ";
import clsx from "clsx";

const CurrencyForm = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [currencyCode, setCurrencyCode] = useState("EUR");
  const [resultColor, setResultColor] = useState("");

  const convertCurrency = async (amount, currencyCode) => {
    setLoading(true);
    setResultColor("");

    if (!amount || isNaN(amount) || amount <= 0) {
      setResult("Enter a valid amount");
      setResultColor("text-danger");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/?format=json`
      );
      const data = await response.json();

      const exchangeRate = data?.rates?.[0]?.mid;

      if (!exchangeRate) {
        throw new Error("Exchange rate not available.");
      }

      const convertedResult = (amount * exchangeRate).toFixed(2);

      setResult(`${amount} ${currencyCode} = ${convertedResult} PLN`);
    } catch (error) {
      setResult("Exchange rate not available. Please try again");
      setResultColor("text-danger");
    } finally {
      setLoading(false);
    }
  };

  const clearApp = () => {
    setResult("");
    setAmount("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    convertCurrency(amount, currencyCode);
  };

  const handleCurrencyChange = (newCurrencyCode) => {
    setCurrencyCode(newCurrencyCode);
    if (amount !== "") {
      convertCurrency(amount, newCurrencyCode);
    }
  };

  return (
    <div>
      <BsCurrencyExchange size={100} />
      <h1 className="mb-4 mt-3">Currency Converter</h1>
      <button className="btn btn-secondary mb-3 mx-1" onClick={clearApp}>
        Clear
      </button>
      <button
        className="btn btn-secondary mb-3 mx-1"
        onClick={() => convertCurrency(amount, currencyCode)}
      >
        Convert
      </button>

      <form className="row" onSubmit={handleSubmit}>
        <CurrencySelection
          currencyCode={currencyCode}
          setCurrencyCode={handleCurrencyChange}
        />
        <AmountInput amount={amount} setAmount={setAmount} />
      </form>

      <p className={clsx("fs-2", resultColor)} id="result">
        {result}
      </p>
      <Loader loading={loading} />
    </div>
  );
};

export default CurrencyForm;
