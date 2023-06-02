"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { Autocomplete, LoadScript } from "@react-google-maps/api";

import SearchIcon from "@/assets/icons/search-icon.svg";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import ArrowUp from "@/assets/icons/arrow-up.svg";
import CrossIcon from "@/assets/icons/cross.svg";

import CurrentLocation from "@/components/CurrentLocation";
import FavouriteRoute from "@/components/FavouriteRoute";
import NearestStop from "@/components/NearestStop";

import useSession from "@/hooks/useSession";
import haversineDistance from "@/functions/haversine";
import clsx from "clsx";

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
  useSession();

  const [showFav, setShowFav] = useState(true);

  const [address, setAddress] = useState("");
  const [stops, setStops] = useState<stop[]>([]);

  const [currLat, setCurrLat] = useState(0);
  const [currLng, setCurrLng] = useState(0);

  const [destLat, setDestLat] = useState(0);
  const [destLng, setDestLng] = useState(0);
  const [destName, setDestName] = useState("");

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  const [firstFavRoute, setFirstFavRoute] = useState<favRoute>();
  const [secondFavRoute, setSecondFavRoute] = useState<favRoute>();

  const MAPS_API_KEY = "AIzaSyAoFTL5YjSh3urWT3I1896Cp1F3TdCMsq8";
  const fetchLocationAddress = async (lat: number, lng: number) => {
    return await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_API_KEY}`
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrLat(-6.893163);
        setCurrLng(107.610445);

        fetchLocationAddress(-6.893163, 107.610445)
          .then((res) => res.json())
          .then((data) =>
            setAddress(data.results[0].address_components[1].short_name)
          )
          .catch((err) => console.error(err));
      });
    }

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

  if (Cookies.get("jwt")) {
    return (
      <main className="relative">
        <div className="flex items-center pt-8 justify-between w-[80.7vw] mx-auto">
          <Link href="/dashboard">
            <Image src={ArrowBack} width={25} height={10} alt="" />
          </Link>
          <CurrentLocation address={address} />
        </div>

        <div className="mt-3">
          <LoadScript libraries={["places"]} googleMapsApiKey={MAPS_API_KEY}>
            <Autocomplete
              onLoad={(autocomplete) => {
                setAutocomplete(autocomplete);
              }}
              onPlaceChanged={() => {
                if (
                  autocomplete &&
                  autocomplete.getPlace().geometry?.location?.lat()
                ) {
                  setDestLat(
                    autocomplete.getPlace().geometry?.location?.lat() || 0
                  );
                  setDestLng(
                    autocomplete.getPlace().geometry?.location?.lng() || 0
                  );
                  setDestName(autocomplete.getPlace().name || "");

                  setStops([
                    {
                      distance: haversineDistance(
                        currLat,
                        currLng,
                        destLat,
                        destLng
                      ),
                      title: autocomplete.getPlace().name || "",
                      address: autocomplete.getPlace().formatted_address || "",
                    },
                  ]);
                }
              }}
            >
              <div className="flex bg-GRAY-300 py-2 px-3 w-[80vw] mx-auto rounded-[20px] border border-black z-40">
                <Image src={SearchIcon} width={12} height={12} alt="" />
                <input
                  className="text-[10px] bg-GRAY-300 ml-2 outline-none font-poppinsLight flex-auto"
                  type="text"
                  placeholder="Institut Teknologi Bandung"
                />
              </div>
            </Autocomplete>
          </LoadScript>
        </div>

        <ul className="mt-5 h-[38.3vh] overflow-hidden pb-10">
          {stops.map((stop, index) => {
            const title =
              stop.title.length > 20
                ? stop.title.slice(0, 20) + "..."
                : stop.title;
            const address =
              stop.address.length > 38
                ? stop.address.slice(0, 35) + "..."
                : stop.address;

            return (
              <div key={index} className="first:mt-0 mt-3">
                <Link
                  href={`choose-stop?lat=${destLat}&lng=${destLng}&destName=${destName}`}
                >
                  <NearestStop
                    distance={stop.distance}
                    title={title}
                    address={address}
                  />
                </Link>
              </div>
            );
          })}
        </ul>

        <div
          className={clsx(
            "w-full h-[320px] bg-BLUE-700 pt-8 rounded-t-[18px] fixed bottom-0 transition-all z-20",
            showFav ? "" : "translate-y-full"
          )}
        >
          <button
            className="w-[26px] h-[26px] rounded-full bg-white border border-GRAY-600 flex items-center justify-center absolute right-7 top-5"
            onClick={() => setShowFav(false)}
          >
            <Image src={CrossIcon} width={11} height={11} alt="" />
          </button>

          <h4 className="text-white font-poppinsBold w-[79.2vw] mx-auto">
            Rute Favorit
          </h4>

          <Link href="/route-finding">
            <div className="mt-7">
              <FavouriteRoute
                route={firstFavRoute?.route}
                title={firstFavRoute?.title}
                distance={firstFavRoute?.distance}
                date={firstFavRoute?.date}
              />
            </div>
          </Link>

          <Link href="/route-finding">
            <div className="mt-6">
              <FavouriteRoute
                route={secondFavRoute?.route}
                title={secondFavRoute?.title}
                distance={secondFavRoute?.distance}
                date={secondFavRoute?.date}
              />
            </div>
          </Link>
        </div>

        <button
          className="w-[26px] h-[26px] rounded-full bg-white border border-GRAY-600 flex items-center justify-center fixed right-7 bottom-5 z-10"
          onClick={() => setShowFav(true)}
        >
          <Image src={ArrowUp} width={10} height={15} alt="" />
        </button>
      </main>
    );
  } else {
    return (
      <div className="z-40 fixed left-0 top-0 h-[100vh] w-full bg-white"></div>
    );
  }
}
