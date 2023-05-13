"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import CurrentLocation from "@/components/CurrentLocation";
import DestinationInput from "@/components/DestinationInput";

import ArrowBack from "@/assets/icons/arrow-back.svg";
import LocationIcon from "@/assets/icons/location-icon.svg";

type stop = {
  distance: number;
  title: string;
  address: string;
};

export default function BuyTicketPage(): JSX.Element {
  const [address, setAddress] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState<stop[]>([]);

  useEffect(() => {
    setAddress("Jl. Bojongsoang No.3");
    setStops([
      {
        distance: 2,
        title: "Institut Teknologi Harapan Bangsa",
        address:
          "Jl. Dipati Ukur No.80, Dago, Coblong, Kota Bandung, Jawa Barat",
      },
      {
        distance: 2,
        title: "Institut Teknologi Harapan Bangsa",
        address:
          "Jl. Dipati Ukur No.80, Dago, Coblong, Kota Bandung, Jawa Barat",
      },
      {
        distance: 2,
        title: "Institut Teknologi Harapan Bangsa",
        address:
          "Jl. Dipati Ukur No.80, Dago, Coblong, Kota Bandung, Jawa Barat",
      },
      {
        distance: 2,
        title: "Institut Teknologi Harapan Bangsa",
        address:
          "Jl. Dipati Ukur No.80, Dago, Coblong, Kota Bandung, Jawa Barat",
      },
    ]);
  }, []);

  return (
    <main>
      <div className="flex items-center pt-8 justify-between w-[80.7vw] mx-auto">
        <Image src={ArrowBack} width={25} height={10} alt="" />
        <CurrentLocation address={address} />
      </div>

      <div className="mt-3">
        <DestinationInput
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        />
      </div>

      <ul className="mt-5">
        {stops.map((stop, index) => {
          const title =
            stop.title.length > 24
              ? stop.title.slice(0, 24) + "..."
              : stop.title;
          const address =
            stop.address.length > 42
              ? stop.address.slice(0, 42) + "..."
              : stop.address;

          return (
            <div
              key={index}
              className="bg-GRAY-400 w-[80vw] rounded-[10px] first:mt-0 mt-3 flex pl-5 pr-4 py-3 mx-auto"
            >
              <div className="flex flex-col items-center pt-1.5 w-10 h-10 rounded-md bg-GRAY-600">
                <Image src={LocationIcon} width={13} height={13} alt="" />
                <p className="font-poppinsLight text-white text-[10px] mt-1">
                  {stop.distance + " KM"}
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
        })}
      </ul>
    </main>
  );
}
