"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ImageType = {
  id: string;
  url: string;
};

type Props = {
  id: string;
  name: string;
};

const CollectionCard = ({ id, name }: Props) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/collections/${id}/images`);
        const data = await res.json();
        if (!mounted) return;
        setImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching images:", error);
        if (mounted) setImages([]);
      }
    };
    fetchImages();
    return () => {
      mounted = false;
    };
  }, [id]);

  const preview = images.slice(0, 3);

  return (
    <div className="">
      <article
        role="button"
        onClick={() => router.push(`/collections/${id}`)}
        className="group rounded-md overflow-hidden bg-transparent cursor-pointer"
      >
        <div className="w-full">
          {preview.length === 0 && (
            <div className="relative h-[220px]">
              <div className="absolute inset-0 transition-opacity group-hover:bg-black/5" />
            </div>
          )}
          {preview.length === 1 && (
            <div className="relative h-[220px]">
              <Image
                src={preview[0].url}
                alt={name}
                fill
                className="object-cover rounded-md "
                sizes="(max-width: 640px) 100vw, 400px"
              />
              <div className="absolute inset-0 transition-opacity group-hover:bg-black/5" />
            </div>
          )}

          {preview.length === 2 && (
            <div className="grid grid-cols-2 gap-2 h-[220px] rounded-md">
              {preview.map((img) => (
                <div key={img.id} className="relative">
                  <Image
                    src={img.url}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                  <div className="absolute inset-0 transition-opacity group-hover:bg-black/5" />
                </div>
              ))}
            </div>
          )}


          {preview.length >= 3 && (
            <div
              className="grid gap-2 h-[220px] rounded-md"
              style={{
                gridTemplateColumns: "2fr 1fr",
                gridTemplateRows: "1fr 1fr",
              }}
            >

              <div className="relative row-span-2">
                <Image
                  src={preview[0].url}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 600px"
                />
                <div className="absolute inset-0 transition-opacity group-hover:bg-black/5" />
              </div>

              <div className="relative">
                <Image
                  src={preview[1].url}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 200px"
                />
                <div className="absolute inset-0 transition-opacity group-hover:bg-black/5" />
              </div>
              <div className="relative">
                <Image
                  src={preview[2].url}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 200px"
                />
                <div className="absolute inset-0 transition-opacity group-hover:bg-black/5" />
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3">
          <p className="font-medium text-dark dark:text-light text-lg">
            {name}
          </p>
          <p className="text-sm text-gray mt-1">
            {images.length} photo{images.length !== 1 ? "s" : ""}
          </p>
        </div>
      </article>
    </div>
  );
};

export default CollectionCard;
