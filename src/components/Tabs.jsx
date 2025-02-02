import { useState } from "react";

const Tabs = ({ children }) => {
  return <div>{children}</div>;
};

export const TabList = ({ children }) => {
  return <div className="flex space-x-4">{children}</div>;
};

export const TabTrigger = ({ active, onClick, children }) => {
  return (
    <button
      className={`px-4 py-2 rounded ${
        active ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TabContent = ({ active, children }) => {
  return active ? <div>{children}</div> : null;
};

export default Tabs;
