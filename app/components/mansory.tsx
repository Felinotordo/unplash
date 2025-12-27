"use client";

import Link from "next/link";
import Image from "next/image";

type ImageItem = {
  id: string;
  src: string;
  alt?: string;
  width: number;
  height: number;
};

interface MasonryGridProps {
  images: ImageItem[];
}

const MasonryGrid = ({ images }: MasonryGridProps) => {
  return (
    <div className="w-full max-w-[1200px] px-4 mx-auto bg-transparent">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {images.map((img) => (
          <Link
            key={img.id}
            href={`/image/${img.id}`}
            className="mb-4 break-inside-avoid block overflow-hidden rounded-xl cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt ?? ""}
              width={img.width}
              height={img.height}
              className="w-full h-auto object-cover rounded-xl bg-transparent hover:scale-[1.02] transition-transform duration-300"
              placeholder="blur"
              blurDataURL="/blur.png"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;
