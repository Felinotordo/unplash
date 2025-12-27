import Image from "next/image";

type Props = {
  name: string;
  images: string[];
};

const CollectionCard = ({ name, images }: Props) => {
  const previewImages = images.slice(0, 3);

  return (
    <div className="w-full cursor-pointer">
      <div className="h-[220px] w-full rounded-xl overflow-hidden bg-gray-200">
        {previewImages.length === 1 && (
          <Image
            src={previewImages[0]}
            alt={name}
            fill
            className="object-cover"
          />
        )}
        {previewImages.length === 2 && (
          <div className="grid grid-cols-2 h-full">
            {previewImages.map((img, i) => (
              <div key={i} className="relative h-full">
                <Image
                  src={img}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
        {previewImages.length >= 3 && (
          <div className="grid grid-cols-3 h-full gap-[2px]">
            {/* Left big image */}
            <div className="relative col-span-2 h-full">
              <Image
                src={previewImages[0]}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-[2px] h-full">
              {previewImages.slice(1, 3).map((img, i) => (
                <div key={i} className="relative h-full">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-2">
        <p className="font-medium text-dark">{name}</p>
        <p className="text-sm text-gray">{images.length} photos</p>
      </div>
    </div>
  );
};

export default CollectionCard;
