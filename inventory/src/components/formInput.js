import React, { useState } from "react";
import Navbar from "./navbar";

function FormInput() {
  return (
    <>
      <Navbar />
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
                <input
                  id="item_category"
                  name="item_category"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                type="text"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
              />
            </div>
          </div>

          <div>
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

          <div>
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
    </>
  );
}

export default FormInput; 
