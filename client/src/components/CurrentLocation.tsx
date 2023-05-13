import Image from "next/image";

import ArrowDown from "@/assets/icons/arrow-down.svg";

type componentProps = {
  address: string;
};

export default function CurrentLocation({
  address,
}: componentProps): JSX.Element {
  return (
    <div className="bg-GRAY-100 w-[195px] h-6 rounded-[20px] pl-3 flex items-center">
      <p className=" font-allrounderRegular font-medium text-BROWN-700 text-sm mr-2.5">
        {address}
      </p>
      <Image
        style={{ opacity: 0.12 }}
        src={ArrowDown}
        width={12}
        height={12}
        alt=""
      />
    </div>
  );
}
