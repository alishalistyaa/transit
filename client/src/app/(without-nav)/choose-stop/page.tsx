"use client";

import {
  GoogleMap,
  LoadScript,
  Circle,
  OverlayView,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

import ArrowBack from "@/assets/icons/arrow-back.svg";
import NavIcon from "@/assets/icons/nav-icon.svg";

import NearestStop from "@/components/NearestStop";

import useSession from "@/hooks/useSession";
import haversineDistance from "@/functions/haversine";

const MAPS_API_KEY = "AIzaSyAoFTL5YjSh3urWT3I1896Cp1F3TdCMsq8";

const containerStyle = {
  width: "100vw",
  height: "80vh",
};

type stop = {
  distance: number;
  title: string;
  address: string;
};

export default function ChooseStopPage(): JSX.Element {
  useSession();

  const searchParam = useSearchParams();

  const destLat = searchParam.get("lat");
  const destLng = searchParam.get("lng");
  const destName = searchParam.get("destName");

  const [currLat, setCurrLat] = useState(0);
  const [currLng, setCurrLng] = useState(0);
  const [currName, setCurrName] = useState("");

  const [stopLat, setStopLat] = useState(0);
  const [stopLng, setStopLng] = useState(0);
  const [stopId, setStopId] = useState(0);

  const [stops, setStops] = useState<stop[]>([]);

  const MAPS_API_KEY = "AIzaSyAoFTL5YjSh3urWT3I1896Cp1F3TdCMsq8";
  const fetchLocationAddress = async (lat: number, lng: number) => {
    return await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_API_KEY}`
    );
  };

  useEffect(() => {
    const fetchNearestStop = async () => {
      return await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/stop/nearest?lat=${currLat}&lng=${currLng}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
    };

    if (Cookies.get("jwt")) {
      fetchNearestStop()
        .then((res) => res.json())
        .then((data) => {
          setStopLat(data.message.Lat);
          setStopLng(data.message.Lng);
          setStopId(data.message.StopId);

          setStops([
            {
              distance: haversineDistance(
                currLat,
                currLng,
                data.message.Lat,
                data.message.Lng
              ),
              title: data.message.Name || "",
              address: data.message.Address || "",
            },
          ]);
        })
        .catch((err) => console.error(err));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrLat(-6.893163);
        setCurrLng(107.610445);

        fetchLocationAddress(-6.893163, 107.610445)
          .then((res) => res.json())
          .then((data) =>
            setCurrName(data.results[0].address_components[1].short_name)
          )
          .catch((err) => console.error(err));
      });
    }
  }, [currLat, currLng]);

  const center = {
    lat: currLat,
    lng: currLng,
  };

  if (Cookies.get("jwt")) {
    return (
      <main className="relative w-full h-[100vh]">
        <div className="absolute top-0 left-0 w-full h-[100vh]">
          <LoadScript googleMapsApiKey={MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              options={{ disableDefaultUI: true }}
            >
              <Circle
                center={center}
                options={{
                  fillColor: "#25D05514",
                  strokeColor: "#54A382",
                  radius: 600,
                }}
              />
              <OverlayView
                position={{
                  lat: currLat,
                  lng: currLng,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="w-[20px] h-[20px] bg-BLUE-700 rounded-full translate-x-[-10px] -translate-y-[50%] flex items-center justify-center">
                  <Image src={NavIcon} width={10} height={10} alt="" />
                </div>
              </OverlayView>

              {stopLat && stopLng ? (
                <OverlayView
                  position={{
                    lat: stopLat || 0,
                    lng: stopLng || 0,
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="w-[120px] bg-GREEN-500 rounded-[11px] py-2 px-3 translate-x-[-60px] -translate-y-[50%] relative">
                    <p className=" font-poppinsBold text-[8px] text-white">
                      {stops[0].title}
                    </p>
                    <div className="absolute -bottom-1 rotate-45 w-4 bg-GREEN-500 -z-10 h-4 left-[53px]"></div>
                  </div>
                </OverlayView>
              ) : null}
            </GoogleMap>
          </LoadScript>
        </div>

        <Link href="/buy-ticket">
          <div className="absolute left-6 top-5 bg-white rounded-full border border-GRAY-600 w-[52px] h-[52px] flex items-center justify-center">
            <Image src={ArrowBack} width={25} height={10} alt="" />
          </div>
        </Link>

        <div className="fixed bottom-0 w-full h-[200px] bg-white rounded-t-[50px]">
          <div className="flex justify-between pl-9 pr-8 pt-8 items-center">
            <h3 className="font-poppinsBold text-BLUE-700">Halte Di Dekatmu</h3>
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
                    href={`route-finding?destLat=${destLat}&destLng=${destLng}&stopId=${stopId}&currLat=${currLat}&currLng=${currLng}&destName=${destName}&currName=${currName}`}
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
        </div>
      </main>
    );
  } else {
    return (
      <div className="z-40 fixed left-0 top-0 h-[100vh] w-full bg-white"></div>
    );
  }
}
