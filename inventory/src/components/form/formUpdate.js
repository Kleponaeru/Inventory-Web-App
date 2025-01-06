import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import Card from "@mui/material/Card";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

function FormUpdate() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [item_category, setItemCategory] = useState({
    id: "",
    name: "",
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const result = await response.json();
        // Transform the data to match react-select format
        const options = result.map((category) => ({
          value: category.id,
          label: category.category_name,
        }));
        setCategories(options);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch item data based on the id
    const fetchItemData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items/${id}`);
        const data = await response.json();

        // Populate the state with the fetched item data
        if (data) {
          setItemName(data.item_name);
          setSelectedCategory({
            value: data.id_category,
            label: data.item_category,
          });
          setItemCategory({
            id: data.id_category,
            name: data.item_category,
          });
          setQty(data.qty);
          setSupplier(data.supplier);
          setBrand(data.brand);
          setCost(data.cost);
          setSalesPrice(data.sale_price);
          setDescription(data.description);
          setExpirationDate(formatDate(data.expiration_date));
          setArrivalDate(formatDate(data.arrival_date));
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [id]);

  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected);
    if (selected) {
      setItemCategory({
        id: selected.value, // This is the category ID
        name: selected.label, // This is the category name
      });
    } else {
      setItemCategory({ id: "", name: "" });
    }
  };

  const [item_name, setItemName] = useState("");
  // const [item_category, setItemCategory] = useState("");
  const [qty, setQty] = useState("");
  const [supplier, setSupplier] = useState("");
  const [brand, setBrand] = useState("");
  const [cost, setCost] = useState("");
  const [sales_price, setSalesPrice] = useState("");
  const [description, setDescription] = useState("");
  const [expiration_date, setExpirationDate] = useState("");
  const [arrival_date, setArrivalDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission

    // Retrieve the token from localStorage (assuming it's stored there after login)
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/items/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
          body: JSON.stringify({
            item_name,
            id_category: item_category.id, // Send category ID
            item_category: item_category.name,
            qty: parseInt(qty), // Convert to number
            supplier,
            brand,
            cost: parseFloat(cost), // Convert to number
            sales_price: parseFloat(sales_price),
            description,
            expiration_date,
            arrival_date,
          }),
        }
      );

      const data = await response.json(); // Parse the JSON response
      if (response.ok) {
        // If item addition is successful, redirect to inventory page
        navigate("/inventory", {
          state: { success: "Item successfully added." },
        });
      } else {
        alert(data.error || "Failed to add item!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred during item update.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-content p-6">
        <Card variant="outlined" className="max-w-4xl mx-auto mt-10 p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Update Items</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl py-6">
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="space-y-6 x-max"
            >
              {/* Item Name, Category, and Quantity side by side */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="w-full">
                  <label
                    htmlFor="item_name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Item Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="item_name"
                      name="item_name"
                      type="text"
                      value={item_name}
                      onChange={(e) => setItemName(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="ex: Chitato Flat"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="item_category"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Item Category
                  </label>
                  <div className="mt-2">
                    <Select
                      id="item_category"
                      name="item_category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      options={categories}
                      placeholder="Select Category"
                      isClearable
                      classNamePrefix="custom-select"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="qty"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Quantity
                  </label>
                  <div className="mt-2">
                    <input
                      id="qty"
                      name="qty"
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="ex: 1"
                    />
                  </div>
                </div>
              </div>

              {/* Supplier and Brand side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                  <label
                    htmlFor="supplier"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Supplier
                  </label>
                  <div className="mt-2">
                    <input
                      id="supplier"
                      name="supplier"
                      type="text"
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="ex: Wings"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="brand"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Brand
                  </label>
                  <div className="mt-2">
                    <input
                      id="brand"
                      name="brand"
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="ex: Chitato"
                    />
                  </div>
                </div>
              </div>

              {/* Other fields */}
              <div>
                <label
                  htmlFor="cost"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Cost per item (Purchase cost)
                </label>
                <div className="mt-2">
                  <input
                    id="cost"
                    name="cost"
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="ex: 10.000"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="sales_price"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Sale Price per item (Sales cost)
                </label>
                <div className="mt-2">
                  <input
                    id="sales_price"
                    name="sales_price"
                    type="text"
                    value={sales_price}
                    onChange={(e) => setSalesPrice(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="ex: 10.000"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Descriptions
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Place Description Here..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                  <label
                    htmlFor="expiration_date"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Exp. Date
                  </label>
                  <div className="mt-2">
                    <input
                      id="expiration_date"
                      name="expiration_date"
                      type="date"
                      value={expiration_date}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="arrival_date"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Arrival Date
                  </label>
                  <div className="mt-2">
                    <input
                      id="arrival_date"
                      name="arrival_date"
                      type="date"
                      value={arrival_date}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="flex mt-4 justify-end space-x-4">
                  <button
                    type="button"
                    className="flex justify-center rounded-md border border-indigo-600 bg-white px-3 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-200 ease-in-out"
                    onClick={() => navigate("/inventory")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update Items
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}

export default FormUpdate;
