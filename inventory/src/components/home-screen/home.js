import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "./slider";

const stats = [
  { name: "Total Users", value: "1,024" },
  { name: "Active Projects", value: "76" },
  { name: "Revenue", value: "$120k" },
];

const navigation = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Users", path: "/admin/users" },
  { name: "Projects", path: "/admin/projects" },
  { name: "Settings", path: "/admin/settings" },
];

export default function Dashboard() {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Dashboard Content */}
          <main className="p-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                {" "}
                <h1 className="">
                  Hi, Lorem ipsum.y only adjusting the height, the top alignment
                  and horizontal dimensions remain the same.
                </h1>
              </div>
              <div>
                {" "}
                <h1 className="">
                  Hi, Lorem ipsum.y only adjusting the height, the top alignment
                  and horizontal dimensions remain the same.
                </h1>
              </div>
              <div>
                {" "}
                <h1 className="">
                  Hi, Lorem ipsum.y only adjusting the height, the top alignment
                  and horizontal dimensions remain the same.
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  style={{
                    height: "auto",
                    minHeight: "120px",
                    alignContent: "center",
                  }}
                  className="bg-white p-4 rounded-lg shadow text-center"
                >
                  <dt className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-800">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  style={{
                    height: "120px",
                    minHeight: "120px",
                    alignContent: "center",
                  }}
                  className="bg-white p-4 rounded-lg shadow text-center"
                >
                  <dt className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-800">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </div>
          </main>
          {/* <Slider /> */}
        </div>
      </div>
    </>
  );
}
