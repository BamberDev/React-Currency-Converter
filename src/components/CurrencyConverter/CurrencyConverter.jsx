import { useState } from "react";
import CurrencyForm from "../Form/CurrencyForm";

const CurrencyConverter = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [currencyCode, setCurrencyCode] = useState("EUR");

  const convertCurrency = async (amount, currencyCode) => {
    setLoading(true);

    if (!amount || isNaN(amount) || amount <= 0) {
      setResult(<span className="text-danger">Enter a valid amount.</span>);
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
      setResult(
        <span className="text-danger">
          Exchange rate not available. Please try again.
        </span>
      );
    } finally {
      setLoading(false);
    }
  };

  const clearApp = () => {
    setResult("");
    setAmount("");
  };

  return (
    <main>
      <div className="container text-center my-5 py-5">
        <CurrencyForm
          convertCurrency={convertCurrency}
          clearApp={clearApp}
          loading={loading}
          result={result}
          amount={amount}
          setAmount={setAmount}
          currencyCode={currencyCode}
          setCurrencyCode={setCurrencyCode}
        />
      </div>
    </main>
  );
};

export default CurrencyConverter;
