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

  const fetchCollections = async () => {
    try {
      const res = await fetch("/api/collections");
      const data = await res.json();
      setCollections(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
    }
  };

  useEffect(() => {
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
        await fetchCollections();
      }
    } catch (error) {
      console.error("Error saving collection:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Header activePage="collections">
        <div className="flex items-center justify-center flex-col w-full my-[28px]">
          <h1
            className="
            text-[40px]
            font-semibold
            bg-linear-to-r
            from-[#f0c59b]
            to-[#8d3684]
            bg-clip-text
            text-transparent
            w-fit
            my-[10px] 
          "
          >
            Collections
          </h1>
          <h1 className="text-dark dark:text-light font-vietnam font-extralight w-[360px] text-[14px] text-center">
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
          <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-10">
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
