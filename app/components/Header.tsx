"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const pathname = usePathname(); //esto me da la ruta actual

  const activeClasses =
    "text-dark bg-light rounded-[5px] font-vietnam font-medium text-[14px] px-[20px] py-[10px]";

  const inactiveClasses =
    "text-gray bg-transparent rounded-[5px] font-vietnam font-medium text-[14px] px-[20px] py-[10px]";

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center border-b-2 border-light-transparent w-full h-[65px]">
        <div className="w-[calc(100%-35px)] h-full flex items-center justify-between gap-4 px-4">
          <Image src="/Logo.svg" alt="Logo" width={120} height={30} priority />

          <div className="flex gap-2">
            <Link
              href="/"
              className={pathname === "/" ? activeClasses : inactiveClasses}
            >
              Home
            </Link>

            <Link
              href="/collections"
              className={
                pathname === "/collections" ? activeClasses : inactiveClasses
              }
            >
              Collections
            </Link>
          </div>
        </div>
      </div>
      <div
        className="w-full h-[calc(100vh-65px)] flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
};

export default Header;
