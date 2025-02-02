export const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-5/6 max-h-[80vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="self-end text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto  flex-1 example">{children}</div>
      </div>
    </div>
  );
};

export const DialogTrigger = ({ children, onClick }) => {
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export const DialogContent = ({ children }) => {
  return <div>{children}</div>;
};
