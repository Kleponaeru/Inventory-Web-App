import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Card from "react-bootstrap/Card";
import { GoPlusCircle } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";

const TableItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isDeleting, setIsDeleting] = useState(null);

  // Customize table styles for better mobile view
  const customStyles = {
    table: {
      style: {
        minWidth: "600px", // Set a minimum width
        overflowX: "auto", // Enable horizontal scrolling
      },
    },
    headRow: {
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        fontSize: "12px",
        minHeight: "40px",
      },
    },
  };

  // Define the columns based on your data structure (adjust column names accordingly)
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
      compact: true,
    },
    {
      name: "Items Name",
      selector: (row) => row.item_name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.item_category,
      sortable: true,
    },
    {
      name: "Supplier",
      selector: (row) => row.supplier,
      sortable: true,
    },
    {
      name: "Qty.",
      selector: (row) => row.qty,
      sortable: true,
      width: "60px",
      compact: true,
    },
    {
      name: "Cost per item",
      selector: (row) => formatCurrency(row.cost),
      sortable: true,
    },
    {
      name: "Sale Price per item",
      selector: (row) => formatCurrency(row.sale_price),
      sortable: true,
    },
    {
      name: "Exp. Date",
      selector: (row) => formatDate(row.expiration_date),
      sortable: true,
    },
    {
      name: "Arrival Date",
      selector: (row) => formatDate(row.arrival_date),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span class="bg-blue-100 text-blue-800 text-xs px-2 rounded-full dark:bg-blue-900 dark:text-blue-300">
          {row.item_status}
        </span>
      ),
      sortable: true,
      compact: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="text-lg bg-indigo-500 hover:bg-indigo-800 text-white py-2 px-2 mr-2 rounded-full transition-colors duration-300"
            type="button"
            onClick={() => navigate(`/inventory/update/${row.id}`)}
          >
            <BiEditAlt />
          </button>
          <button
            className="text-lg bg-transparent text-red-700 border border-red-700 rounded-full py-2 px-2 inline-flex items-center justify-center transition-colors duration-300 hover:bg-red-500 hover:text-white"
            type="button"
            onClick={async () => {
              const token = localStorage.getItem("authToken");
              console.log(token);
              if (!token) {
                console.error("No token found. Please log in again.");
                return;
              }

              try {
                // Make API request to delete the item
                const response = await fetch(
                  `http://localhost:5000/api/items/delete/${row.id}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                if (response.ok) {
                  const data = await response.json();
                  console.log("Item deleted:", data);
                } else {
                  const errorData = await response.json();
                  console.error("Error deleting item:", errorData);
                  alert(errorData.error || "Failed to delete item.");
                }
              } catch (error) {
                console.error("Request failed:", error);
                alert("An error occurred while trying to delete the item.");
              }
            }}
          >
            <MdDeleteOutline />
          </button>
        </>
      ),
      sortable: true,
      width: "120px",
    },
  ];

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/items"); // Adjust the URL to your actual API endpoint
        const result = await response.json();
        console.log(result); // Log the fetched data
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, []);

  // Filter data based on search input
  const filteredData = data.filter(
    (item) =>
      item.item_name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.item_category.toLowerCase().includes(searchText.toLowerCase()) ||
      item.qty.toString().toLowerCase().includes(searchText.toLowerCase()) ||
      item.item_status.toLowerCase().includes(searchText.toLowerCase())
  );

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Gets abbreviated month name
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Optional: You can add more decimal places if needed
    })
      .format(amount)
      .replace("Rp", "Rp "); // Replace currency symbol with "Rp "
  }

  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => navigate("/inventory/add")}
            className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <GoPlusCircle /> <span>Add Items</span>
          </button>
        </div>
        {/* Replace Bootstrap Card with Tailwind div */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">Items List</h1>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              paginationPerPage={10}
              customStyles={customStyles}
              responsive
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableItems;
