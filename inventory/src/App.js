import "./App.css";
import Login from "./components/login-form/loginForm";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TableItems from "./components/table/itemsTable";
import Register from "./components/login-form/registerForm";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import FormInput from "./components/form/formInputItems";
import Dashboard from "./components/home-screen/home";
import FormUpdate from "./components/form/formUpdateItems";
import TableTransactions from "./components/table/transactionsTable";
import FormInputTransactions from "./components/form/formInputTransactions";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token")) // Initialize authentication state from localStorage
  );

  // UseEffect to monitor token changes and maintain consistent state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token); // Store token
    setIsAuthenticated(true); // Set authentication state
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Reset authentication state
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect '/' to login if not authenticated */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar onLogout={handleLogout} />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <TableItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory/add"
            element={
              <ProtectedRoute>
                <FormInput />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory/update/:id"
            element={
              <ProtectedRoute>
                <FormUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TableTransactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions/add"
            element={
              <ProtectedRoute>
                <FormInputTransactions />
              </ProtectedRoute>
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
