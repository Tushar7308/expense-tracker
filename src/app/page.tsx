"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import track from "../../public/images/income.png";
import budget from "../../public/images/budget.png";
import salary from "../../public/images/salary.png";

const Home = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    let storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    setProfile(null); // Reset profile state
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat">
      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-center space-x-4 z-50 bg-black bg-opacity-50">
        <div className="text-white font-bold text-xl">Expenses Tracker</div>
        <div className="flex space-x-4">
          {!profile ? (
            <>
              <Link href="/register">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-lg hover:bg-blue-700 transition duration-300">
                  Register
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg shadow-lg hover:bg-green-700 transition duration-300">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg shadow-lg hover:bg-green-700 transition duration-300">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg shadow-lg hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      {/* <div className="flex flex-col items-center justify-center text-center text-black relative z-10 pt-32">
        <h1 className="text-4xl font-extrabold leading-tight mb-6">
          Welcome to Your Expense Tracker
        </h1>
        <p className="text-lg mb-10 max-w-md mx-auto">
          Manage your finances effectively by tracking your daily expenses,
          setting budgets, and saving for your goals.
        </p>
      </div> */}

      {/* What is Expense Tracker Section */}
      <div className="py-32 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-6">
            What is an Expense Tracker?
          </h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            An Expense Tracker is a tool that helps you record and categorize
            your daily spending. It enables you to understand where your money
            is going and make smarter financial decisions.
          </p>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center">
              <img
                src={track.src}
                alt="Track Expenses"
                className="w-20 h-20 mb-4"
              />
              <h3 className="font-semibold">Track Your Spending</h3>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={budget.src}
                alt="Set Budget"
                className="w-20 h-20 mb-4"
              />
              <h3 className="font-semibold">Set Budgets</h3>
            </div>
            <div className="flex flex-col items-center ml-4">
              <img
                src={salary.src}
                alt="Save Money"
                className="w-20 h-20 mb-4"
              />
              <h3 className="font-semibold">Save More</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Key Features</h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Our Expense Tracker comes with powerful features to help you keep
            control of your finances:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3">Easy Tracking</h3>
              <p className="text-lg text-gray-700">
                Record your daily expenses quickly with an intuitive interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3">Detailed Insights</h3>
              <p className="text-lg text-gray-700">
                Get detailed reports and analytics to understand your spending
                patterns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3">Goal Setting</h3>
              <p className="text-lg text-gray-700">
                Set financial goals and track your progress over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
