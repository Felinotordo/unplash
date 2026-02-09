"use client";
import { AddCollectionCard } from "../components/AddCollections";
import CollectionCard from "../components/CollectionCard";
import { AddCollectionModal } from "../components/AddCollectionsModal";
import Header from "../components/Header";
import { useState, useEffect } from "react";

type Collection = {
  id: string;
  name: string;
  created_at: string;
  images: string[];
};

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/collections");
        const data = await res.json();
        setCollections(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const addCollection = () => {
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  const save_collection = async (name: string) => {
    try {
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/collections");
        const data = await res.json();
        setCollections(data);
      }
    } catch (error) {
      console.error("Error saving collection:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Header activePage="collections">
        <div className="flex items-center justify-center flex-col w-full my-[20px] md:my-[28px] px-4">
          <h1 className="text-[32px] md:text-[40px] font-semibold bg-linear-to-r from-[#f0c59b] to-[#8d3684] bg-clip-text text-transparent w-fit my-[8px] md:my-[10px] text-center">
            Collections
          </h1>
          <h1 className="text-dark dark:text-light font-vietnam font-extralight w-full max-w-[360px] text-[13px] md:text-[14px] text-center px-4">
            Explore the world through collections of beautiful photos free to
            use under the{" "}
            <a
              href="https://unsplash.com/license"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:text-gray-600 transition-colors"
            >
              Unsplash License
            </a>
            .
          </h1>
          <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 my-6 md:my-10 px-4">
            {!isLoading && (
              <>
                {collections.map((collection) => (
                  <CollectionCard
                    key={collection.id}
                    id={collection.id}
                    name={collection.name}
                  />
                ))}
                <AddCollectionCard onClick={addCollection} />
              </>
            )}
          </div>
        </div>
        
      </Header>
      <AddCollectionModal
          isOpen={modalOpen}
          onClose={onClose}
          onSave={save_collection}
        />
    </div>
  );
}
