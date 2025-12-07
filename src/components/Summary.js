import React from "react";

function Summary({ transactions, limit, setLimit }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="summary">
      <div>💰 Доход: {income}</div>
      <div>💸 Расход: {expense}</div>
      <div>📊 Баланс: {balance}</div>

      <div className="limit-block">
        <input
          type="number"
          placeholder="Месячный лимит"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <div>Осталось: {limit - expense}</div>
      </div>
    </div>
  );
}

export default Summary;
