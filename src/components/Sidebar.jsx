// components/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 p-4">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-xl font-bold">Dashboard</span>
      </div>
      <nav className="space-y-2">
        <a
          href="#dashboard"
          className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          <span className="mr-2">📊</span>
          Dashboard
        </a>
        <a
          href="#assets"
          className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          <span className="mr-2">🖼️</span>
          Assets
        </a>
        <a
          href="#gigs"
          className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          <span className="mr-2">💼</span>
          Gigs
        </a>
        <a
          href="#games"
          className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          <span className="mr-2">🎮</span>
          Games
        </a>
        <a
          href="#store-settings"
          className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          <span className="mr-2">⚙️</span>
          Store Settings
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
