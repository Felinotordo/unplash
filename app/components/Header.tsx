"use client";
import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "@/lib/hooks/useDarkMode";

type ActivePage = "home" | "collections";

interface HeaderProps {
  children?: React.ReactNode;
  activePage: ActivePage;
}

const Header = ({ children, activePage }: HeaderProps) => {
  const { toggleTheme } = useDarkMode();

  const activeClasses =
    "text-dark dark:text-white bg-light dark:bg-gray/30 rounded-[5px] font-vietnam font-medium text-[14px] px-[20px] py-[10px]";

  const inactiveClasses =
    "text-gray bg-transparent rounded-[5px] font-vietnam font-medium text-[14px] px-[20px] py-[10px]";

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-dark transition-colors duration-300">
      <div className="flex items-center justify-center border-b border-b-light dark:border-b-gray w-full h-[65px]">
        <div className="w-[calc(100%-35px)] h-full flex items-center justify-between gap-4 px-4">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={120}
            height={30}
            priority
            className="dark:invert dark:brightness-0 dark:contrast-100"
          />

          <div className="flex gap-2">
            <Link
              href="/"
              className={
                activePage === "home" ? activeClasses : inactiveClasses
              }
            >
              Home
            </Link>

            <Link
              href="/collections"
              className={
                activePage === "collections"
                  ? activeClasses
                  : inactiveClasses
              }
            >
              Collections
            </Link>

            <button
              onClick={toggleTheme}
              className="text-gray cursor-pointer bg-transparent rounded-[5px] font-vietnam font-medium text-[14px] px-4 py-2 hover:text-dark hover:bg-light transition-colors duration-300"
            >
              Change Mode
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-65px)] flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Header;
