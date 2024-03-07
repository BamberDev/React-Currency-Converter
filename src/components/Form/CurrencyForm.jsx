import { useState } from "react";
import { BsCurrencyExchange } from "react-icons/bs";
import Loader from "../Loader/Loader";
import AmountInput from "./AmountInput/AmountInput";
import CurrencySelection from "./CurrencySelection/CurrencySelection ";

const CurrencyForm = ({
  convertCurrency,
  clearApp,
  loading,
  result,
  amount,
  setAmount,
}) => {
  const [currencyCode, setCurrencyCode] = useState("EUR");

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

      <p className="fs-2" id="result">
        {result}
      </p>
      <Loader loading={loading} />
    </div>
  );
};

export default CurrencyForm;
