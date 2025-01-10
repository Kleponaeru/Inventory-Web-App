import React from "react";

const stats = [
  { name: "Total Users", value: "1,024", icon: "👤" },
  { name: "Active Projects", value: "76", icon: "📁" },
  { name: "Revenue", value: "$120k", icon: "💰" },
];

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-lg shadow flex items-center"
          >
            <div className="text-4xl mr-4">{stat.icon}</div>
            <div>
              <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
              <dd className="text-2xl font-bold text-gray-800">{stat.value}</dd>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Recent Activities</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <ul className="space-y-4">
            <li className="flex items-center justify-between text-gray-700">
              <span>📁 Project A updated</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex items-center justify-between text-gray-700">
              <span>👤 New user registered</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </li>
            <li className="flex items-center justify-between text-gray-700">
              <span>💰 Payment received</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Placeholder for Charts or Additional Data */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Performance Overview</h2>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">[Placeholder for charts or graphs]</p>
        </div>
      </div>
    </div>
  );
}
