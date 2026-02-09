import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ImageType = {
  id: string;
  url: string;
};

const Collections = ({
  id,
  name,
  id_image,
  deleteImageFromCollection,
}: {
  id: string;
  name: string;
  id_image: string;
  deleteImageFromCollection: (collectionId: string, imageId: string) => void;
}) => {
  const [image, setImage] = useState<ImageType[]>([]);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/collections/${id}/images`);
        const data = await res.json();
        if (!mounted) return;
        setImage(data.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
        if (mounted) setImage([]);
      }
    };
    fetchImages();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div
      className="flex flex-row cursor-pointer items-center justify-between gap-3 w-full h-[60px] p-3 rounded-md  hover:bg-light dark:hover:bg-gray/70"
      onClick={() => router.push(`/collections/${id}`)}
    >
      <div className="flex justify-center items-center gap-3 flex-row">
        <div className="w-[50px] h-[50px] flex flex-row items-center justify-center bg-gray-200 rounded-md overflow-hidden">
          <Image
            src={image[0]?.url || "/placeholder.png"}
            alt={name}
            width={50}
            height={50}
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col gap-0">
          <h3 className="text-[13px] dark:text-white font-vietnam font-medium text-dark">
            {name}
          </h3>
          <p className="text-[11px] text-gray font-vietnam">
            {image.length} photo{image.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <button
        className="flex flex-row items-center justify-center h-fu gap-3 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          deleteImageFromCollection(id, id_image);
        }}
      >
        <Image
          src="/Remove.svg"
          alt="Add"
          width={16}
          height={16}
          className="select-none dark:invert"
        />
        <span className="text-[11px] font-vietnam font-light text-dark dark:text-white">
          Remove
        </span>
      </button>
    </div>
  );
};

export default Collections;
