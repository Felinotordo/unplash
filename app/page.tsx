"use client";
import Header from "./components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Header activePage="home">
      <div className="w-full min-h-[calc(100vh-65px)] flex justify-center items-center flex-col bg-[url('/hero-image.png')] bg-cover bg-no-repeat bg-center">
        <div className="w-[600px] flex flex-col items-center justify-center py-[80px] bg-transparent">
          <h1 className="m-0 py-[2px] font-vietnam text-dark dark:text-gray font-semibold text-[36px]">
            Search
          </h1>
          <p className="m-0 py-[2px] font-vietnam font-light text-[16px] text-gray">
            Search high-resolution images from Unsplash
          </p>
          <div className="w-[90%] my-[20px] relative">
            <input
              type="text"
              placeholder="Enter your keywords..."
              className="w-full dark:text-light px-[20px] py-[15px] rounded-[9px] border border-light-transparent dark:placeholder:text-gray dark:bg-gray/10 dark:border-gray font-vietnam font-extralight text-[14px] text-dark focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = (e.target as HTMLInputElement).value;
                  if (!value.trim()) return;

                  router.push(`/search?q=${encodeURIComponent(value)}`);
                }
              }}
            />

            <Image
              src="/Search.svg"
              alt="search"
              width={25}
              height={25}
              className="absolute right-[20px] top-1/2 -translate-y-1/2 pointer-events-none dark:opacity-50 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </Header>
  );
}
