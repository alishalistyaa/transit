"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import CurrentLocation from "@/components/CurrentLocation";
import DestinationInput from "@/components/DestinationInput";
import FavouriteRoute from "@/components/FavouriteRoute";
import NearestStop from "@/components/NearestStop";

import ArrowBack from "@/assets/icons/arrow-back.svg";

type stop = {
  distance: number;
  title: string;
  address: string;
};

type favRoute = {
  route: string;
  title: string;
  distance: number;
  date: Date;
};

export default function BuyTicketPage(): JSX.Element {
  const [address, setAddress] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState<stop[]>([]);

  const [firstFavRoute, setFirstFavRoute] = useState<favRoute>();
  const [secondFavRoute, setSecondFavRoute] = useState<favRoute>();

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
    setFirstFavRoute({
      route: "Kelapa - Dago",
      title: "Ke rumah",
      distance: 2,
      date: new Date("2023-02-21"),
    });
    setSecondFavRoute({
      route: "Dago - Caringin",
      title: "Ke perpustakaan",
      distance: 4,
      date: new Date("2023-02-21"),
    });
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
            stop.title.length > 20
              ? stop.title.slice(0, 20) + "..."
              : stop.title;
          const address =
            stop.address.length > 38
              ? stop.address.slice(0, 38) + "..."
              : stop.address;

          return (
            <div key={index} className="first:mt-0 mt-3">
              <NearestStop
                distance={stop.distance}
                title={title}
                address={address}
              />
            </div>
          );
        })}
      </ul>

      <div className="w-full h-[360px] bg-BLUE-700 pt-12 rounded-t-[18px] absolute bottom-0">
        <h4 className="text-white font-poppinsBold w-[79.2vw] mx-auto">
          Rute Favorit
        </h4>

        <div className="mt-7">
          <FavouriteRoute
            route={firstFavRoute?.route}
            title={firstFavRoute?.title}
            distance={firstFavRoute?.distance}
            date={firstFavRoute?.date}
          />
        </div>

        <div className="mt-6">
          <FavouriteRoute
            route={secondFavRoute?.route}
            title={secondFavRoute?.title}
            distance={secondFavRoute?.distance}
            date={secondFavRoute?.date}
          />
        </div>
      </div>
    </main>
  );
}
