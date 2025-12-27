"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/Header";

type UnsplashPhoto = {
  id: string;
  width: number;
  height: number;
  alt_description: string | null;
  description: string | null;
  created_at: string;
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  urls: {
    regular: string;
    full: string;
  };
};

const Page = () => {
  const { id } = useParams<{ id: string }>();

  const [image, setImage] = useState<UnsplashPhoto | null>(null);
  const [loading, setLoading] = useState(true);
  const [Collection, setCollection] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch image");
        }

        const data: UnsplashPhoto = await res.json();
        setImage(data);
        console.log("Fetched image data:", data);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  return (
    <Header activePage="home">
      <div className="w-full flex justify-center px-2 py-4 my-[25px]">
        {loading && <p className="text-gray text-sm">Loading...</p>}

        {!loading && image && (
          <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Imagen */}
            <div className="flex justify-center">
              <Image
                src={image.urls.regular}
                alt={image.alt_description ?? "Unsplash image"}
                width={image.width}
                height={image.height}
                className="w-full h-auto rounded-xl bg-transparent max-w-[90%] md:max-w-full"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3 px-2 md:px-0 w-full">
              {/* Autor */}
              <div className="flex items-center gap-3 max-w-[80%] md:max-w-full">
                <Image
                  src={image.user.profile_image.medium}
                  alt={image.user.name}
                  width={42}
                  height={42}
                  className="rounded-full"
                />

                <div className="flex flex-col leading-tight">
                  <p className="text-dark dark:text-light font-medium">
                    {image.user.name}
                  </p>
                  <p className="text-gray text-sm">@{image.user.username}</p>
                </div>
              </div>

              {/* Fecha */}
              <p className="text-gray text-sm">
                Published on {new Date(image.created_at).toLocaleDateString()}
              </p>
              {/* Botones */}
              <div className="mt-4 flex items-center flex-row gap-2">
                <button className="text-dark text-[10px] md:text-[12px] dark:text-light font-vietnam font-medium inline-flex items-center justify-center gap-2 w-fit px-[22px] py-[10px] md:px-[25px] md:py-[12px] cursor-pointer rounded bg-light-transparent dark:bg-gray hover:opacity-90 transition">
                  <Image
                    src="/Plus.svg"
                    alt="Add"
                    width={16}
                    height={16}
                    className="select-none dark:invert"
                  />

                  <span>Add to Collection</span>
                </button>
                <button className="text-dark text-[10px] md:text-[12px] dark:text-light font-vietnam font-medium inline-flex items-center justify-center gap-2 w-fit px-[22px] py-[10px] md:px-[25px] md:py-[12px] cursor-pointer rounded bg-light-transparent dark:bg-gray hover:opacity-90 transition">
                  <Image
                    src="/down_arrow.svg"
                    alt="Add"
                    width={16}
                    height={16}
                    className="select-none dark:invert"
                  />

                  <span>Download</span>
                </button>
              </div>
              {/* Collections */}
              <p className="text-[12px] dark:text-white md:text-[16px] font-vietnam font-bold mt-[22px] md:mt-[28px]">
                Collections
              </p>
            </div>
          </div>
        )}
      </div>
    </Header>
  );
};

export default Page;
