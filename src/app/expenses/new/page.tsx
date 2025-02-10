"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface ExpenseFormData {
  amount: number;
  category: string;
  description: string;
}

const AddExpense = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ExpenseFormData>();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setToken(profile.token);
    } else {
      setError("No profile found. Please log in.");
    }
  }, []);

  const onSubmit = async (data: ExpenseFormData) => {
    if (!token) {
      setError("Authentication error. Please log in.");
      return;
    }

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Expense added successfully!");
        reset(); // Clear the form
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add expense.");
      }
    } catch (err) {
      setError("An error occurred while adding the expense.");
    }
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Add Expense</h1>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        {/* Amount */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Amount</label>
          <input
            type="number"
            {...register("amount", { required: "Amount is required", min: 1 })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
          />
          {errors.amount && <p className="text-red-400 text-sm">{errors.amount.message}</p>}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="text-red-400 text-sm">{errors.category.message}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
          />
          {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
