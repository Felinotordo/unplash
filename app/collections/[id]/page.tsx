"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";

const Page = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const fetchImages = async () => {
      try {
        
      } catch (error) {
        console.error("Error fetching collection data:", error);
      }
    };

    fetchImages();
  }, [id]);

  return (
    <div className="flex items-center justify-center">
      <Header activePage="collections">
        <div className="flex items-center justify-center w-full my-[28px]">
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
          "
          >
            {id}
          </h1>
        </div>
      </Header>
    </div>
  );
};

export default Page;
