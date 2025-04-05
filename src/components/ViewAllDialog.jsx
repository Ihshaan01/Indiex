// components/ViewAllDialog.js
import React from "react";
import { Dialog, DialogContent } from "../components/Dialog";
import Card from "../components/Card";

const ViewAllDialog = ({ open, onClose, title, items }) => {
  return (
    <Dialog open={open} onOpenChange={onClose} onClose={onClose}>
      <DialogContent className="bg-gray-800 rounded-lg p-6 backdrop-blur-sm overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-black">All {title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
          {items.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAllDialog;
