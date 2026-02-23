import React, { useState } from "react";

interface AddCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export const AddCollectionModal: React.FC<AddCollectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [collectionName, setCollectionName] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (collectionName.trim()) {
      onSave(collectionName.trim());
      setCollectionName("");
      onClose();
    }
  };

  const handleCancel = () => {
    setCollectionName("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-dark/50 flex items-center justify-center z-50"
      onClick={handleCancel}
    >
      <div
        className="bg-white dark:bg-gray max-w-[600px] max-h-[290px] rounded-lg p-6 w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl dark:text-white font-medium font-vietnam text-center mb-4">
          Add Collection
        </h2>

        <div className="mb-6">
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="
              w-full px-5 py-3 
              border border-light rounded-md
              focus:outline-none
              font-vietnam font-extralight
              text-dark text-[15px] dark:text-white
              placeholder:text-gray/50
              placeholder:font-vietnam placeholder:font-extralight
              dark:placeholder:text-white/50
            "
            placeholder="Enter collection name"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && collectionName.trim()) {
                onSave(collectionName.trim());
                setCollectionName("");
                onClose();
              }
            }}
          />
        </div>

        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleSave}
            disabled={!collectionName.trim()}
            className="
              px-4 py-2
              text-[12px] 
              font-vietnam font-light
               text-dark dark:text-white 
              rounded-md
              hover:bg-light-transparent
              disabled:bg-gray-300 disabled:cursor-not-allowed
              transition-colors duration-300
            "
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="
              px-4 py-2
              text-[12px]
              font-vietnam font-light 
              text-dark dark:text-white
              hover:bg-light-transparent
              rounded-md
              transition-colors duration-300
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
