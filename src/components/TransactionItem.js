import React from "react";

function TransactionItem({ transaction, deleteTransaction }) {
  return (
    <div className="transaction">
      <div>
        <strong>{transaction.category}</strong> ({transaction.date})
        <br />
        {transaction.comment}
      </div>
      <div
        className={
          transaction.type === "income" ? "amount income" : "amount expense"
        }
      >
        {transaction.type === "income" ? "+" : "-"}
        {transaction.amount}
      </div>

      <button onClick={() => deleteTransaction(transaction.id)}>❌</button>
    </div>
  );
}

export default TransactionItem;
