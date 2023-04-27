import React, { useState, useEffect } from 'react';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('https://mitch-pmwm.onrender.com/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data));
  },[]);

  const handleDelete = (id) => {
    fetch(`https://mitch-pmwm.onrender.com/transactions/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        
        setTransactions(transactions.filter(transaction => transaction.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2 id='charlo'>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td><button id='btn' onClick={() => handleDelete(transaction.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;

