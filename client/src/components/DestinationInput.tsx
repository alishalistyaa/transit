import { ChangeEvent } from "react";
import Image from "next/image";

import SearchIcon from "@/assets/icons/search-icon.svg";

type componentProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function DestinationInput({
  onChange,
  value,
}: componentProps): JSX.Element {
  return (
    <div className="flex bg-GRAY-300 py-2 px-3 w-[80vw] mx-auto rounded-[20px] border border-black">
      <Image src={SearchIcon} width={12} height={12} alt="" />
      <input
        className="text-[10px] bg-GRAY-300 ml-2 outline-none font-poppinsLight"
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Institut Teknologi Bandung"
      />
    </div>
  );
}
