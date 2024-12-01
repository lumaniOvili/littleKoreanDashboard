"use client";

import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal, FiX } from "react-icons/fi";

// Transaction and order item interfaces
interface OrderItem {
  itemName: string;
  quantity: number;
  price: number;
}

interface Transaction {
  _id: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  totalAmount: number;
  transactionDate: string;
  transactionType: string;
  paymentStatus: string;
}

// Hardcoded menu items
const menu = [
  { name: "Chicken, Pork, or Vegetable Dumpling (6pcs)", price: 6.95 },
  { name: "Vegetarian Spring Rolls (5pcs)", price: 6.95 },
  { name: "Sundubu Jjigae", price: 17.95 },
  { name: "Kimchi Jjigae", price: 17.95 },
  { name: "Gamjatang", price: 16.95 },
  { name: "Soondae Gukbob", price: 18.95 },
  { name: "Galbi Tang", price: 18.95 },
];

// Sample real-looking names and emails for transactions
const sampleCustomers = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Emily Johnson", email: "emily.johnson@example.com" },
  { name: "Michael Brown", email: "michael.brown@example.com" },
  { name: "Sarah Wilson", email: "sarah.wilson@example.com" },
  { name: "David Lee", email: "david.lee@example.com" },
  { name: "Jessica Taylor", email: "jessica.taylor@example.com" },
];

// Generate random transactions with real names
const generateTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    const randomItems = Array.from({ length: Math.ceil(Math.random() * 3) }, () => {
      const randomMenuItem = menu[Math.floor(Math.random() * menu.length)];
      return {
        itemName: randomMenuItem.name,
        quantity: Math.ceil(Math.random() * 3),
        price: randomMenuItem.price,
      };
    });

    const totalAmount = randomItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const customer = sampleCustomers[i % sampleCustomers.length];

    transactions.push({
      _id: `T${i + 1}`.padStart(4, "0"),
      customerName: customer.name,
      email: customer.email,
      items: randomItems,
      totalAmount,
      transactionDate: new Date(
        Date.now() - Math.floor(Math.random() * 1000000000)
      ).toISOString(),
      transactionType: Math.random() > 0.5 ? "Credit Card" : "PayPal",
      paymentStatus:
        Math.random() > 0.7 ? "Failed" : Math.random() > 0.5 ? "Pending" : "Completed",
    });
  }
  return transactions;
};

export const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    setTransactions(generateTransactions(20)); // Generate 20 transactions
  }, []);

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 5);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiDollarSign /> Recent Transactions
        </h3>
        <button
          className="text-sm text-violet-500 hover:underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "See all"}
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {displayedTransactions.map((transaction, index) => (
            <TableRow
              key={transaction._id}
              transaction={transaction}
              order={index + 1}
              onClick={() => setSelectedTransaction(transaction)}
            />
          ))}
        </tbody>
      </table>

      {/* Popup for transaction details */}
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Transaction Details</h3>
              <button
                className="text-stone-500 hover:text-stone-700"
                onClick={() => setSelectedTransaction(null)}
              >
                <FiX />
              </button>
            </div>
            <p><strong>Customer Name:</strong> {selectedTransaction.customerName}</p>
            <p><strong>Email:</strong> {selectedTransaction.email}</p>
            <p><strong>Total Amount:</strong> ${selectedTransaction.totalAmount.toFixed(2)}</p>
            <p>
              <strong>Transaction Date:</strong>{" "}
              {new Date(selectedTransaction.transactionDate).toLocaleDateString()}
            </p>
            <p><strong>Payment Method:</strong> {selectedTransaction.transactionType}</p>
            <p><strong>Payment Status:</strong> {selectedTransaction.paymentStatus}</p>
            <h4 className="font-bold mt-4">Items:</h4>
            <ul className="list-disc ml-4">
              {selectedTransaction.items.map((item, index) => (
                <li key={index}>
                  {item.itemName} - {item.quantity} x ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const TableHead = () => (
  <thead>
    <tr className="text-sm font-normal text-stone-500">
      <th className="text-start p-1.5">Customer ID</th>
      <th className="text-start p-1.5">SKU</th>
      <th className="text-start p-1.5">Date</th>
      <th className="text-start p-1.5">Price</th>
      <th className="w-8"></th>
    </tr>
  </thead>
);

const TableRow = ({
  transaction,
  order,
  onClick,
}: {
  transaction: Transaction;
  order: number;
  onClick: () => void;
}) => (
  <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
    <td className="p-1.5">
      <button
        className="text-violet-600 underline flex items-center gap-1"
        onClick={onClick}
      >
        #{transaction._id} <FiArrowUpRight />
      </button>
    </td>
    <td className="p-1.5">
      {transaction.items
        .map((item) => `${item.itemName} (x${item.quantity})`)
        .join(", ")}
    </td>
    <td className="p-1.5">
      {new Date(transaction.transactionDate).toLocaleDateString()}
    </td>
    <td className="p-1.5">${transaction.totalAmount.toFixed(2)}</td>
    <td className="w-8">
      <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
        <FiMoreHorizontal />
      </button>
    </td>
  </tr>
);
