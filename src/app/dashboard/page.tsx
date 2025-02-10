"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  _id: string;
}

interface Profile {
  user?: User;
  token?: string;
}

const Dashboard = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Load profile from localStorage
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      setError("No profile found. Please login.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (profile && profile.token) {
      fetchExpenses(profile.token);
    }
  }, [profile]); // Fetch expenses only after profile is set

  const fetchExpenses = async (token: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/expenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setExpenses(data.data); // Store fetched expenses
      } else {
        setError(data.message || "Failed to fetch expenses");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred while fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmation) return;

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${profile?.token}`,
        },
      });

      if (response.ok) {
        alert("Expense deleted successfully!");
        setExpenses((prev) => prev.filter((expense) => expense._id !== id)); // Remove from state
      } else {
        alert("Failed to delete expense.");
      }
    } catch (err) {
      alert("Error deleting expense.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">
        <Link href='/'>
        Expense Dashboard
        </Link>
      </h1>

      <Link href="/expenses/new">
        <button className="px-6 py-3 bg-blue-600 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition duration-300 mb-6">
          Add New Expense
        </button>
      </Link>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense: any) => (
                <tr key={expense._id} className="border-b">
                  <td className="px-6 py-3">{expense.amount}</td>
                  <td className="px-6 py-3">{expense.category}</td>
                  <td className="px-6 py-3">{expense.description}</td>
                  <td className="px-6 py-3 flex space-x-4">
                    <Link href={`/expenses/${expense._id}`}>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-3 text-center">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
