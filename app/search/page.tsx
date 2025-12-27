"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useRouter, useSearchParams } from "next/navigation";
import MasonryGrid from "../components/mansory";

const Page = () => {
  type UnsplashPhoto = {
    id: string;
    width: number;
    height: number;
    alt_description: string | null;
    urls: {
      regular: string;
    };
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [images, setImages] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
          )}&per_page=20&page=1`,
          {
            headers: {
              Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            },
          }
        );

        const data = await res.json();

        setImages(data.results);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  return (
    <Header activePage="home">
      <div className="bg-transparent w-full h-fit flex items-center flex-col justify-center">
        <div className="md:bg-[url('/gradiendbg.png')] bg-transparent bg-no-repeat bg-top bg-contain min-w-screen h-[40px] md:h-[110px] flex justify-center md:items-end md:mb-[15px] mb-[45px]">
          <input
            type="text"
            defaultValue={query}
            placeholder="Enter your keywords..."
            className="dark:text-light bg-white px-[15px] md:px-[20px] w-[75%] max-w-[490px] py-[20px] my-[25px] md:m-0 rounded-[9px] border border-light-transparent dark:placeholder:text-gray dark:bg-gray dark:border-gray font-vietnam font-extralight text-[14px] text-dark focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = (e.target as HTMLInputElement).value.trim();
                if (!value) return;

                router.push(`/search?q=${encodeURIComponent(value)}`);
              }
            }}
          />
        </div>
        {images.length != 0 && (
          <MasonryGrid
            images={images.map((photo) => ({
              id: photo.id,
              src: photo.urls.regular,
              alt: photo.alt_description ?? "Unsplash image",
              width: photo.width,
              height: photo.height,
            }))}
          />
        )}
        {images.length == 0 && (
          <p className="text-gray text-sm font-vietnam font-bold px-6 py-6">No images found.</p>
        )}
      </div>
    </Header>
  );
};

export default Page;
