import React from "react";
import "./App.css";
import Login from "./components/loginForm";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormInput from "./components/formInput";
import NotFound from "./components/notFound";
import Home from "./components/home-screen/home";
import Slider from "./components/home-screen/slider";
import TableItems from "./components/table/itemsTable";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Slider />
              </>
            }
          ></Route>
          <Route path="/inventory" element={<TableItems />}></Route>
          <Route path="/inventory/add" element={<FormInput />}></Route>

          {/* Undifined Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
