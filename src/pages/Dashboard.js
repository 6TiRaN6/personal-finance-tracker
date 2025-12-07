import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Summary from "../components/Summary";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionList from "../components/TransactionList";
import Charts from "../components/Charts";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [limit, setLimit] = useState(0);
  const [months, setMonths] = useState(1);

  // Загружаем данные из localStorage при старте
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const storedLimit = parseFloat(localStorage.getItem("limit")) || 0;
    setTransactions(storedTransactions);
    setLimit(storedLimit);
  }, []);

  // Сохраняем транзакции в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Сохраняем лимит в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("limit", limit);
  }, [limit]);

  // Добавление транзакции
  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  // Удаление транзакции
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter((t) => t.id !== id));
  };

  // Общий доход и расход
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  // Месячная статистика
  const getMonthlyStats = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      const tDate = new Date(t.date || now);
      if (tDate.getMonth() === month && tDate.getFullYear() === year) {
        if (t.type === "income") income += Number(t.amount);
        else expense += Number(t.amount);
      }
    });

    return { income, expense };
  };

  const { income, expense } = getMonthlyStats();
  const netPerMonth = income - expense;
  const futureBalance = netPerMonth * Number(months || 0);

  return (
    <div className="container">
      <Header />

      <h1 className="title">Личный Финансовый Трекер</h1>

      <Summary transactions={transactions} limit={limit} setLimit={setLimit} />

      <div className="monthly-stats">
        <h3>Статистика за месяц</h3>
        <p>Доход: {income} ₸</p>
        <p>Расход: {expense} ₸</p>
        <p>Баланс: {balance} ₸</p>
      </div>

      <div className="forecast-box">
        <h3>Финансовый прогноз</h3>
        <input
          type="number"
          min="1"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          placeholder="Количество месяцев"
        />
        <p>Через {months} мес: {futureBalance} ₸</p>
      </div>

      <AddTransactionForm addTransaction={addTransaction} />

      <Charts transactions={transactions} />

      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
    </div>
  );
}

export default Dashboard;
