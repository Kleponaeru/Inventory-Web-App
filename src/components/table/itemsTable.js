import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody } from "@material-tailwind/react";

const TableItems = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [searchText, setSearchText] = useState(""); // State to handle search input

  // Define the columns based on your data structure (adjust column names accordingly)
  const columns = [
    {
      name: "Items Name",
      selector: (row) => row.item_name, // Replace 'event' with the actual key in your database
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.item_category, // Replace 'date' with the actual key in your database
      sortable: true,
    },
    {
      name: "Qty.",
      selector: (row) => row.qty, // Replace 'location' with the actual key in your database
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.item_status, // Replace 'location' with the actual key in your database
      sortable: true,
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

  return (
    <div className="p-4">
      {/* Card from Material Tailwind */}
      <Card className="shadow-lg">
        <CardBody>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          {/* DataTable with pagination, sorting, and filtered data */}
          <DataTable
            title="Items List"
            columns={columns}
            data={filteredData}
            pagination
            sortable
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default TableItems;
