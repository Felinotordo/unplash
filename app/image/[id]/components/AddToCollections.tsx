/* i know this name was not the best and is confuse but is worth.
this component belong to images sections
*/
import React from "react";
import { useEffect, useState } from "react";
import CollectionCardModal from "./CollectionCardModal";

interface AddToCollectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collectionId: string) => Promise<void>; // ✅
}

type Collection = {
  id: string;
  name: string;
  created_at: string;
  images: string[];
};

const AddToCollections: React.FC<AddToCollectionProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  const fetchCollections = async () => {
    try {
      const res = await fetch("/api/collections");
      const data = await res.json();
      setCollections(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (!isOpen) return null;

  const handleSave = (collection_id: string) => {
    onSave(collection_id);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-dark/50 flex items-center justify-center z-50"
      onClick={handleCancel}
    >
      <div
        className="w-[90%] max-w-[600px] max-h-[80%] bg-white dark:bg-gray rounded-lg py-4 px-3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[14px] sm:text-[16px] w-full text-left dark:text-white font-medium font-vietnam">
          Add to Collection
        </h2>
        <input
          className="w-full mt-3 px-2 py-3 rounded-md border-light dark:border-light-transparent border font-vietnam font-extralight dark:text-white text-dark text-[12px] sm:text-[14px]
              placeholder:text-gray/50
              placeholder:font-vietnam placeholder:font-extralight
              dark:placeholder:text-white/50
              focus:outline-none"
          placeholder="Enter a collection name"
        />
        <p className="text-[10px] font-vietnam font-extralight text-gray my-3">
          {collections.length} matches
        </p>

        {collections.map((collection) => (
          <div
            key={collection.id}
            className=""
            onClick={() => handleSave(collection.id)}
          >
            <CollectionCardModal
              id={collection.id}
              name={collection.name}
              image={collection.images?.[0] || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddToCollections;
