import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current path
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.log("No token found");
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log("User data before setting state:", data); // Debug log
          setUser(data);
          // console.log("User state after setting:", data); // Debug log
        } else {
          console.error("Failed to fetch user data");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const navItems = [
    { id: 1, text: "Dashboard", href: "/dashboard" },
    { id: 2, text: "Inventory", href: "/inventory" },
    { id: 3, text: "Transactions", href: "/transactions" },
    ...(user?.admin === "Y" ? [{ id: 4, text: "Report", href: "/" }] : []),
    // { id: 5, text: "Logout", href: "/", icon: <MdLogout /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="bg-black h-16 sticky top-0 z-50">
      <div className="flex justify-between items-center h-full w-full px-6 text-white">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <h1 className="text-3xl font-bold text-white p-2 mr-6">LY.</h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`relative p-3 m-2 cursor-pointer duration-300 ${
                  location.pathname === item.href
                    ? "font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:transition-transform after:duration-300"
                    : "hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-white hover:after:scale-x-100 after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
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
        </div>

        {/* Profile Menu - Only visible on desktop */}
        <div className="hidden md:block">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <CgProfile size={20} />
                <span>{user?.f_name || "User"}</span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>

        {/* Mobile Menu Button */}
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        {nav && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleNav}
          />
        )}
        <ul
          className={`${
            nav
              ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
          }`}
        >
          {/* Mobile Logo */}
          <h1 className="w-full text-3xl font-bold text-[#FFFFFF] m-4">LY.</h1>

          {/* Mobile Navigation Menu */}
          {nav && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleNav}
            />
          )}
          <ul
            className={`${
              nav
                ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50"
                : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
            }`}
          >
            {/* Mobile Logo */}
            <h1 className="w-full text-3xl font-bold text-[#FFFFFF] m-4">
              LY.
            </h1>

            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`p-4 border-b duration-300 cursor-pointer border-gray-600 ${
                  location.pathname === item.href
                    ? "bg-[#FFFFFF] text-black"
                    : "hover:bg-[#FFFFFF] hover:text-black"
                }`}
              >
                <Link to={item.href}>{item.text}</Link>
              </li>
            ))}

            {/* Mobile Profile Section - Placed at the bottom */}
            <div className="absolute bottom-0 w-full border-t border-gray-600 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-2 text-white">
                <CgProfile size={20} />
                <span>{user?.f_name || "User"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white hover:text-gray-300"
              >
                <MdLogout size={20} />
                {/* <span>Logout</span> */}
              </button>
            </div>
          </ul>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
