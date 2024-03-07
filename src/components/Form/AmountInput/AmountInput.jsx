import styles from "./AmountInput.module.scss";

const AmountInput = ({ amount, setAmount }) => {
  return (
    <div className="col-md fs-4 text-md-start m-1">
      <label htmlFor="amount">Amount:</label>
      <input
        className={styles.amountInput}
        type="number"
        id="amount"
        min="0.01"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  );
};

export default AmountInput;
