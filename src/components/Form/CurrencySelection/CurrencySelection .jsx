const CurrencySelection = ({ currencyCode, setCurrencyCode }) => {
  const handleCurrencyChange = (e) => {
    const newCurrencyCode = e.target.value;
    setCurrencyCode(newCurrencyCode);
  };

  return (
    <div className="col-md fs-4 text-md-end m-1">
      <label htmlFor="currency">Select currency:</label>
      <select
        id="currency"
        value={currencyCode}
        onChange={handleCurrencyChange}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CHF">CHF</option>
      </select>
    </div>
  );
};
export default CurrencySelection;
