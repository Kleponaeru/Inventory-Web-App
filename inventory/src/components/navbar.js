import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current path
  const [user, setUser] = useState(null);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log("User data:", data); // Debug log
        } else {
          console.error("Failed to fetch user data");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const navItems = [
    { id: 1, text: "Dashboard", href: "/dashboard" },
    { id: 2, text: "Inventory", href: "/inventory" },
    { id: 3, text: "Transactions", href: "/transactions" },
    ...(user?.admin === "Y" ? [{ id: 4, text: "Report", href: "/" }] : []),
    { id: 5, text: "Logout", href: "/", icon: <MdLogout /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-black h-16 sticky top-0 z-50">
    <div className="flex justify-between items-center h-24 max-w mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-white">LY.</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`p-4 rounded-xl m-2 cursor-pointer duration-300 ${
              location.pathname === item.href
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
            onClick={item.text === "Logout" ? handleLogout : null}
          >
            <Link to={item.href} className="flex items-center">
              {item.text}
              {item.icon && <span className="ml-2">{item.icon}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">LY.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`p-4 border-b rounded-xl duration-300 cursor-pointer border-gray-600 ${
              location.pathname === item.href
                ? "bg-[#00df9a] text-black"
                : "hover:bg-[#00df9a] hover:text-black"
            }`}
            onClick={item.text === "Logout" ? handleLogout : null}
          >
            <Link to={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
    </nav>
  );
};

export default Navbar;
