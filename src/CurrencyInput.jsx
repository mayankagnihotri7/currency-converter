import React from "react";

function CurrencyInput({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) {
  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={onChangeAmount}
        className="input"
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions?.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyInput;
