import Image from "next/image";

import LocationIcon from "@/assets/icons/location-icon.svg";

type componentProps = {
  distance: number;
  title: string;
  address: string;
};

export default function NearestStop({
  distance,
  title,
  address,
}: componentProps): JSX.Element {
  return (
    <div className="bg-GRAY-400 w-[80vw] rounded-[10px] flex pl-5 pr-4 py-3 mx-auto">
      <div className="flex flex-col items-center pt-1.5 w-10 h-10 rounded-md bg-GRAY-600">
        <Image src={LocationIcon} width={13} height={13} alt="" />
        <p className="font-poppinsLight text-white text-[10px] mt-1">
          {distance.toFixed(1) + " KM"}
        </p>
      </div>

      <div className="ml-4">
        <h3 className="text-BROWN-800 font-jeko">{title}</h3>
        <p className="mt-1 font-poppinsLight text-[10px] text-BROWN-800">
          {address}
        </p>
      </div>
    </div>
  );
}
