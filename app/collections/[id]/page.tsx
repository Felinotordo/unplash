"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import { useParams } from "next/navigation";
import MasonryGrid from "@/app/components/mansory";

type CollectionImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [images, setImages] = useState<CollectionImage[]>([]);
  const [collectionName, setCollectionName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCollectionData = async () => {
      try {
        setLoading(true);

        // Fetch collection name
        const collectionRes = await fetch(`/api/collections/${id}/images`);
        if (collectionRes.ok) {
          const collectionData = await collectionRes.json();
          setCollectionName(collectionData.collection_name);
          setImages(collectionData.images || []);
        }
      } catch (error) {
        console.error("Error fetching collection data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [id]);

  return (
    <Header activePage="collections">
      <div className="bg-transparent w-full h-fit flex items-center flex-col justify-center">
        {!loading && (
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-[32px] md:text-[40px] font-semibold bg-linear-to-r from-[#f0c59b] to-[#8d3684] bg-clip-text text-transparent w-fit mt-[21px] md:mt-[25px] text-center">
              {collectionName}
            </h1>
            <p className="text-[12px] text-dark/80 mb-[9px] sm:mb-[25px] dark:text-gray font-vietnam font-light">
              {images.length} photo{images.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
        {!loading && images.length > 0 && (
          <MasonryGrid
            images={images.map((photo) => ({
              id: photo.id,
              src: photo.url,
              alt: "Collection image",
              width: photo.width,
              height: photo.height,
            }))}
          />
        )}

        {!loading && images.length === 0 && (
          <p className="text-gray text-[12px] font-vietnam font-bold px-[12px] py-[12px]">
            No images in this collection.
          </p>
        )}

        {loading && (
          <p className="text-gray text-sm font-vietnam font-bold px-6 py-6">
            Loading...
          </p>
        )}
      </div>
    </Header>
  );
};

export default Page;
