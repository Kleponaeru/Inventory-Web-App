import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleNav = () => {
    setNav(!nav);
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        // console.log(token);
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("/api/user", {
          // Removed extra spaces
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
        // navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Dashboard", href: "/dashboard" },
    { id: 2, text: "Inventory", href: "/inventory" },
    { id: 3, text: "Transactions", href: "/transactions" },
    ...(user?.admin === "Y" ? [{ id: 4, text: "Report", href: "/" }] : []),
    { id: 5, text: "Logout", href: "/", icon: <MdLogout /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // Consistent token name
    navigate("/login");
  };

  return (
    <div className="bg-black flex justify-between items-center h-24 max-w mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-white">LY.</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-white rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
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
            className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
