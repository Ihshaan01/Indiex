import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const DropDown = ({ buttonLabel, items, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  const handleSelect = (item) => {
    setSelectedItem(item); // Update the selected item
    setOpen(false); // Close the dropdown
    onSelect(item.val);
  };
  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md text-sm border border-[#e4e4e7] h-10 px-4 py-2"
        onClick={handleToggle}
      >
        {selectedItem ? (
          <>
            {selectedItem.icon && (
              <span className="mr-2">{selectedItem.icon}</span>
            )}
            {selectedItem.val}
          </>
        ) : (
          buttonLabel
        )}
        <span className="ml-2">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {open && (
        <div className="absolute top-full mt-1 px-3 w-auto shadow-md rounded-md p-1 border bg-white z-10">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className="relative flex items-center w-auto gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer  whitespace-nowrap overflow-hidden text-ellipsis"
                onClick={() => handleSelect(item)}
              >
                {item.val}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
