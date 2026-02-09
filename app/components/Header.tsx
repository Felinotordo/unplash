"use client";
import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "@/lib/hooks/useDarkMode";
import { useState } from "react";

type ActivePage = "home" | "collections";

interface HeaderProps {
  children?: React.ReactNode;
  activePage: ActivePage;
}

const Header = ({ children, activePage }: HeaderProps) => {
  const { toggleTheme } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeClasses =
    "text-dark dark:text-white bg-light dark:bg-gray/30 rounded-md font-vietnam font-medium text-[13px] sm:text-[14px] px-3 sm:px-[20px] py-2 sm:py-[10px]";

  const inactiveClasses =
    "text-gray bg-transparent rounded-md font-vietnam font-medium text-[13px] sm:text-[14px] px-3 sm:px-[20px] py-2 sm:py-[10px]";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-dark transition-colors duration-300">
      {/* HEADER */}
      <div className="flex items-center justify-center border-b border-b-light dark:border-b-gray w-full h-[60px] sm:h-[65px]">
        <div className="w-full max-w-[1280px] h-full flex items-center justify-between gap-3 px-3 sm:px-6">
          
          {/* LOGO */}
          <Link href="/" aria-label="Go to home">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={120}
              height={30}
              priority
              className="w-[90px] sm:w-[120px] cursor-pointer dark:invert dark:brightness-0 dark:contrast-100"
            />
          </Link>

          {/* NAV DESKTOP */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className={activePage === "home" ? activeClasses : inactiveClasses}
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
              className="text-gray cursor-pointer bg-transparent rounded-md font-vietnam font-medium text-[13px] sm:text-[14px] px-3 sm:px-4 py-2 hover:text-dark hover:bg-light transition-colors duration-300"
            >
              Mode
            </button>
          </div>

          {/* HAMBURGER MENU BUTTON */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <Image
              src="/hamburger-menu.svg"
              alt="Menu"
              width={24}
              height={24}
              className="dark:invert"
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-dark/50 z-40 md:hidden"
          onClick={closeMenu}
        >
          <div 
            className="absolute right-0 top-0 h-full w-[250px] bg-white dark:bg-dark border-l border-light dark:border-gray shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button 
                onClick={closeMenu}
                className="text-gray text-2xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            {/* Menu items */}
            <div className="flex flex-col gap-2 px-4">
              <Link
                href="/"
                className={activePage === "home" ? activeClasses : inactiveClasses}
                onClick={closeMenu}
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
                onClick={closeMenu}
              >
                Collections
              </Link>

              <button
                onClick={() => {
                  toggleTheme();
                  closeMenu();
                }}
                className="text-gray text-left cursor-pointer bg-transparent rounded-md font-vietnam font-medium text-[13px] sm:text-[14px] px-3 sm:px-4 py-2 hover:text-dark hover:bg-light dark:hover:bg-gray/30 transition-colors duration-300"
              >
                Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="w-full min-h-[calc(100vh-65px)] flex flex-col bg-white dark:bg-dark">
        {children}
      </div>
    </div>
  );
};

export default Header;