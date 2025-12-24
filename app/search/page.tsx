"use client";
import Header from "../components/Header";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <Header activePage="home">
      <div className="bg-transparent w-full h-fit flex items-center flex-col justify-center">
        <div className="bg-[url('/gradiendbg.png')] bg-no-repeat bg-top bg-contain w-full h-[110px] flex justify-center items-end mb-[25px]">
          <input
            type="text"
            defaultValue={query}
            placeholder="Enter your keywords..."
            className="dark:text-light bg-white px-[20px] w-[75%] max-w-[490px] py-[15px] rounded-[9px] border border-light-transparent dark:placeholder:text-gray dark:bg-gray dark:border-gray font-vietnam font-extralight text-[14px] text-dark focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = (e.target as HTMLInputElement).value.trim();
                if (!value) return;

                router.push(`/search?q=${encodeURIComponent(value)}`);
              }
            }}
          />
        </div>
        Hola
      </div>
    </Header>
  );
};

export default Page;
