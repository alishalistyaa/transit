import Image from "next/image";

import FavRouteIcon from "@/assets/icons/fav-route-icon.svg";
import RouteIcon from "@/assets/icons/route-icon.svg";
import DateIcon from "@/assets/icons/date-icon.svg";

type componentProps = {
  route?: string;
  title?: string;
  distance?: number;
  date?: Date;
};

export default function FavouriteRoute({
  route,
  title,
  distance,
  date,
}: componentProps): JSX.Element {
  return (
    <div className="w-[79.2vw] h-[86px] mx-auto relative bg-white rounded-[20px]">
      <div className="flex items-center justify-center bg-BLUE-500 w-[66px] h-[66px] rounded-full absolute -top-3 left-2">
        <Image src={FavRouteIcon} width={32} height={32} alt="" />
      </div>

      <div className="absolute pl-6 left-[60px] top-2 rounded-[20px] bg-GREEN-400 flex items-center h-[33px] w-[166px]">
        <h5 className="font-poppinsBold text-black">{route}</h5>
      </div>

      <div className="absolute left-[83px] top-11">
        <div className="flex items-center">
          <Image src={RouteIcon} width={14} height={14} alt="" />
          <p className="font-poppinsLight text-[10px] text-GRAY-700 ml-0.5">
            {title}
          </p>
        </div>

        <div className="flex items-center">
          <Image src={DateIcon} width={12} height={12} alt="" />
          <p className="font-poppinsLight text-[10px] text-GRAY-700 ml-0.5">
            {date?.getDate() +
              "/" +
              date?.getMonth() +
              1 +
              "/" +
              date?.getFullYear()}
          </p>
        </div>
      </div>

      <div className="absolute right-3.5 top-6 flex flex-col items-center">
        <p className="font-poppinsLight text-GRAY-800">{distance + " KM"}</p>
        <p className="font-poppinsLight text-GRAY-800 text-[10px]">dari Anda</p>
      </div>
    </div>
  );
}
