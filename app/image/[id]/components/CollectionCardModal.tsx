import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  id: string;
  name: string;
  image: string;
};

type ImageType = {
  id: string;
  url: string;
};

const CollectionCardModal = ({ id, name }: Props) => {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/collections/${id}/images`);
        const data = await res.json();
        if (!mounted) return;
        setImages(data.images || []);
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

  const firstImageUrl = images[0]?.url;

  return (
    <div className="flex cursor-pointer flex-row items-center mt-3 justify-between group">
      <div className="flex flex-row items-center">
        {firstImageUrl && ( 
          <Image
            src={firstImageUrl}
            alt={name}
            width={50}
            height={50}
            className="rounded-[5px] object-cover w-[50px] h-[50px]"
          />
        )}
        {!firstImageUrl && ( // ✅ Cambia aquí también
          <div className="w-[50px] h-[50px] rounded-[9px] bg-light/30 flex items-center justify-center"></div>
        )}
        <div className="flex flex-col mx-3 gap-1">
          <h3 className="text-dark dark:text-white font-vietnam font-medium text-[12px]">
            {name}
          </h3>
          <p className="text-dark dark:text-white font-vietnam font-light text-[9px]">
            {images.length} {images.length === 1 ? "photo" : "photos"}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center text-[17px] mx-3 text-dark dark:text-dark opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[17px]">+</span>
        <span className="text-dark dark:text-gray font-vietnam font-light text-[10px] ml-2">
          Add to collection
        </span>
      </div>
    </div>
  );
};

export default CollectionCardModal;
