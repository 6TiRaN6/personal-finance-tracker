import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import "./assets/styles.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Загружаем транзакции из localStorage при старте
  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  // Сохраняем транзакции в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <Dashboard
      transactions={transactions}
      addTransaction={(t) => setTransactions(prev => [...prev, t])}
      removeTransaction={(id) => setTransactions(prev => prev.filter(t => t.id !== id))}
    />
  );
}

export default App;
