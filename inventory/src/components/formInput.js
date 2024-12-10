import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Card from "@mui/material/Card";
import Select from "react-select";

function FormInput() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  return (
    <>
      <Navbar />
      <div className="main-content p-6">
        <Card variant="outlined" className="max-w-xl mx-auto mt-10 p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Add Items</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg py-6">
            <form action="#" method="POST" className="space-y-6 x-max">
              {/* Item Name, Category, and Quantity side by side */}
              <div className="flex space-x-4">
                <div className="flex-1">
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
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="ex: Chitato Flat"
                    />
                  </div>
                </div>

                <div className="flex-1">
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
                      onChange={setSelectedCategory}
                      options={categories}
                      placeholder="Select Category"
                      isClearable
                      classNamePrefix="custom-select"
                    />
                  </div>
                </div>

                <div className="flex-1">
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
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="ex: 1"
                    />
                  </div>
                </div>
              </div>

              {/* Supplier and Brand side by side */}
              <div className="flex space-x-4">
                <div className="flex-1">
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
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="ex: Wings"
                    />
                  </div>
                </div>

                <div className="flex-1">
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
                  Cost (Purchase cost)
                </label>
                <div className="mt-2">
                  <input
                    id="cost"
                    name="cost"
                    type="number"
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
                  Sale Price (Sales cost)
                </label>
                <div className="mt-2">
                  <input
                    id="sales_price"
                    name="sales_price"
                    type="text"
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
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Place Description Here..."
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
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
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="flex-1">
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
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-4"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}

export default FormInput;
