"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface ExpenseFormData {
  amount: number;
  category: string;
  description: string;
}

const EditExpense = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset, // Use reset() instead of setValue for pre-filling form data
    formState: { errors },
  } = useForm<ExpenseFormData>();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setToken(profile.token);
    } else {
      setError("No profile found. Please log in.");
    }
  }, []);

  // Fetch existing expense details when token and id are available
  useEffect(() => {
    if (!token || !id) return;

    const fetchExpense = async () => {
      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch expense details.");
        }

        const expense = await response.json();

        console.log(expense, "expense");
        // Prefill form fields
        reset({
          amount: expense.data.amount,
          category: expense.data.category,
          description: expense.data.description,
        });

        setLoading(false);
      } catch (err) {
        setError("Error fetching expense.");
        setLoading(false);
      }
    };

    fetchExpense();
  }, [token, id, reset]);

  const onSubmit = async (data: ExpenseFormData) => {
    if (!token) {
      setError("Authentication error. Please log in.");
      return;
    }

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Expense updated successfully!");
        router.push("/dashboard");
      } else {
        setError("Failed to update expense.");
      }
    } catch (err) {
      setError("Error updating expense.");
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
      <h1 className="text-3xl font-bold mb-6 flex">Edit Expense</h1>
      <h1
        className="text-3xl font-bold mb-6 cursor-pointer flex-1" 
        onClick={() => router.push("/dashboard")}
      >
        Back
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        {/* Amount */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Amount</label>
          <input
            type="number"
            {...register("amount", { required: "Amount is required", min: 1 })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
          />
          {errors.amount && (
            <p className="text-red-400 text-sm">{errors.amount.message}</p>
          )}
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
          {errors.category && (
            <p className="text-red-400 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-yellow-600 rounded-lg text-lg shadow-lg hover:bg-yellow-700 transition duration-300"
        >
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
