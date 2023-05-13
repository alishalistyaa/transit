"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Image from "next/image";

import CarIcon from "@/assets/icons/car-icon.svg";
import Checklist from "@/assets/icons/checklist.svg";
import ArrowBack from "@/assets/icons/arrow-back.svg";

const MAPS_API_KEY = "AIzaSyAoFTL5YjSh3urWT3I1896Cp1F3TdCMsq8";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -6.897,
  lng: 107.61,
};

type stop = {
  title: string;
  stopName: string;
};

export default function RouteFindingPage(): JSX.Element {
  const [route, setRoute] = useState("");
  const [routeAddress, setRouteAddress] = useState("");
  const [destination, setDestination] = useState("");

  const [stops, setStops] = useState<stop[]>([]);

  useEffect(() => {
    setRoute("Dago - Cicaheum");
    setRouteAddress("Jalan Dago Bawah No.32");
    setDestination("Jalan Sultan Tirtayasa No.50");

    setStops([
      { title: "Buah Batu", stopName: "Halte Buah Batu depan Griya" },
      { title: "Karapitan", stopName: "Halte Jalan Karapitan IIA" },
    ]);
  }, []);

  return (
    <div className="relative w-full h-[100vh]">
      <div className="absolute top-0 left-0 w-full h-[100vh]">
        <LoadScript googleMapsApiKey={MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{ disableDefaultUI: true }}
          />
        </LoadScript>
      </div>

      <div className="absolute left-6 top-5 bg-white rounded-full border border-GRAY-600 w-[52px] h-[52px] flex items-center justify-center">
        <Image src={ArrowBack} width={25} height={10} alt="" />
      </div>

      <div className="absolute bottom-0 w-full h-[360px] bg-white rounded-t-[50px]">
        <div className="flex justify-between pl-9 pr-8 pt-[50px] items-center">
          <div>
            <h3 className="font-poppinsBold text-lg text-black">2 Rute</h3>
            <p className="font-poppinsLight text-xs text-black mt-1">{route}</p>
          </div>

          <button className="bg-BLUE-700 w-[122px] h-[35px] flex items-center justify-center font-poppinsLight text-white text-xs rounded-[36px]">
            Beli Tiket
          </button>
        </div>

        <div className="px-10 flex mt-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center rounded-full bg-YELLOW-500 w-[43px] h-[43px]">
              <Image src={CarIcon} width={28} height={28} alt="" />
            </div>

            <div className="h-5 w-[3px] bg-GRAY-900" />
            <div className="w-2.5 h-2.5 rounded-full bg-GRAY-900 mt-[-1px]" />

            <div className="h-[54px] w-[3px] bg-GRAY-900" />
            <div className="w-2.5 h-2.5 rounded-full bg-GRAY-900 mt-[-1px]" />

            <div className="h-8 w-[3px] bg-GRAY-900" />

            <div className="bg-GREEN-700 w-[43px] h-[44px] rounded-full flex items-center justify-center">
              <Image src={Checklist} width={19} height={15} alt="" />
            </div>
          </div>

          <div className="ml-6">
            <h3 className="font-poppinsBold text-xs text-black mt-1">
              {route}
            </h3>
            <p className="font-poppinsLight text-[10px] text-black mt-0.5">
              {routeAddress}
            </p>

            {stops.length >= 2 ? (
              <>
                <h3 className="font-poppinsBold text-xs text-black mt-5">
                  {stops[0].title}
                </h3>
                <p className="font-poppinsLight text-[10px] text-black mt-0.5">
                  {stops[0].stopName}
                </p>

                <h3 className="font-poppinsBold text-xs text-black mt-6">
                  {stops[1].title}
                </h3>
                <p className="font-poppinsLight text-[10px] text-black mt-0.5">
                  {stops[1].stopName}
                </p>
              </>
            ) : null}

            <h3 className="font-poppinsBold text-xs text-GREEN-700 mt-6">
              Sampai tujuan!
            </h3>
            <p className="font-poppinsLight text-[10px] text-black mt-0.5">
              {destination}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
