import React, { useState } from "react";

function AddTransactionForm({ addTransaction }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount,
      date,
      comment,
    };

    addTransaction(newTransaction);

    setCategory("");
    setAmount("");
    setDate("");
    setComment("");
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Доход</option>
        <option value="expense">Расход</option>
      </select>

      <input
        type="text"
        placeholder="Категория"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Сумма"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Комментарий (необязательно)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddTransactionForm;
