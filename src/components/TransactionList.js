import React from "react";
import TransactionItem from "./TransactionItem";

function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="list">
      <h2>История операций</h2>
      {transactions.length === 0 && <p>Нет операций</p>}

      {transactions.map((t) => (
        <TransactionItem
          key={t.id}
          transaction={t}
          deleteTransaction={deleteTransaction}
        />
      ))}
    </div>
  );
}

export default TransactionList;
