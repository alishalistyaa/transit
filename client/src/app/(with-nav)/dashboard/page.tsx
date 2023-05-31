"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

import CurrentLocation from "@/components/CurrentLocation";
import DestinationInput from "@/components/DestinationInput";

import CardBackground from "@/assets/images/dashboard-card.png";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import HistoryIcon from "@/assets/icons/history-icon.svg";
import TransitLogo from "@/assets/images/transit-logo.png";

import BisUnchecked from "@/assets/icons/bis-unchecked.svg";
import BisChecked from "@/assets/icons/bis-checked.svg";
import AngkotUnchecked from "@/assets/icons/angkot-unchecked.svg";
import AngkotChecked from "@/assets/icons/angkot-checked.svg";
import KeretaUnchecked from "@/assets/icons/kereta-unchecked.svg";
import KeretaChecked from "@/assets/icons/kereta-checked.svg";
import SepedaUnchecked from "@/assets/icons/sepeda-unchecked.svg";
import SepedaChecked from "@/assets/icons/sepeda-checked.svg";
import TransitUnchecked from "@/assets/icons/transit-unchecked.svg";
import TransitChecked from "@/assets/icons/transit-checked.svg";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";

type history = {
  location: string;
  address: string;
};

export default function DashboardPage(): JSX.Element {
  useSession();

  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [destination, setDestination] = useState("");

  const [isBisChecked, setBisChecked] = useState(false);
  const [isAngkotChecked, setAngkotChecked] = useState(false);
  const [isKeretaChecked, setKeretaChecked] = useState(false);
  const [isSepedaChecked, setSepedaChecked] = useState(false);
  const [isTransitChecked, setTransitChecked] = useState(false);

  const [histories, setHistories] = useState<history[]>([]);

  const router = useRouter();
  const fetchUserData = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  };

  const MAPS_API_KEY = "AIzaSyAoFTL5YjSh3urWT3I1896Cp1F3TdCMsq8";
  const fetchLocationAddress = async (lat: number, lng: number) => {
    return await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_API_KEY}`
    );
  };

  useEffect(() => {
    if (Cookies.get("jwt")) {
      fetchUserData()
        .then((res) => (res.ok ? res.json() : router.push("/login")))
        .then((data) => setUsername(data.message.Name))
        .catch((err) => console.error(err));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) =>
        fetchLocationAddress(pos.coords.latitude, pos.coords.longitude)
          .then((res) => res.json())
          .then((data) =>
            setAddress(data.results[0].address_components[1].short_name)
          )
          .catch((err) => console.error(err))
      );
    }

    setHistories([
      {
        location: "Institut Teknologi Bandung",
        address: "Jalan Ganesha No. 81, Sekeloa",
      },
      {
        location: "Institut Teknologi Bandung",
        address: "Jalan Ganesha No. 81, Sekeloa",
      },
      {
        location: "Institut Teknologi Bandung",
        address: "Jalan Ganesha No. 81, Sekeloa",
      },
    ]);
  }, [router]);

  return (
    <main>
      <div className="w-full flex items-center justify-between px-7 pt-10">
        <Image src={TransitLogo} width={59} height={66} alt="Transit Logo" />

        <CurrentLocation address={address} />
      </div>

      <h1 className="font-jeko text-xl tracking-[0.02] mt-5 mx-10 text-BROWN-700">
        Hi, <span className="text-GREEN-500">{username}</span> <br /> Mau kemana
        hari ini?
      </h1>

      <div className="mt-4">
        <DestinationInput
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        />
      </div>

      <div className="relative w-[86.4vw] h-[174px] bg-BLUE-700 rounded-3xl mt-4 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)] mx-auto px-4 pt-10 overflow-hidden">
        <div className="absolute w-[337px] h-[154px] top-4 left-0 -z-10">
          <Image src={CardBackground} fill={true} alt="" />
        </div>

        <h2 className="font-jeko text-white text-xl">Nikmati</h2>
        <p className="text-white font-poppinsLight text-[8px]">
          Perjalanan pertamamu
          <br />
          bersama kami!
        </p>

        <Link href="/buy-ticket">
          <button className="w-[92px] h-[29px] flex items-center justify-center bg-GREEN-600 mt-3.5 rounded-xl">
            <Image src={ArrowRight} width={20} height={10} alt="" />
          </button>
        </Link>
      </div>

      <h2 className="font-jeko text-xl text-BROWN-700 tracking-[0.02] mt-6 ml-10">
        Moda Transportasi
      </h2>

      <div className="flex justify-between items-center mx-auto w-[320px] mt-3.5">
        <button
          className="relative w-[60px] h-[63px]"
          onClick={() => setBisChecked(!isBisChecked)}
        >
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: isBisChecked ? 1 : 0 }}
          >
            <Image src={BisChecked} width={60} height={63} alt="" />
          </div>
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: !isBisChecked ? 1 : 0 }}
          >
            <Image src={BisUnchecked} width={60} height={63} alt="" />
          </div>
        </button>
        <button
          className="relative w-[60px] h-[63px]"
          onClick={() => setAngkotChecked(!isAngkotChecked)}
        >
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: isAngkotChecked ? 1 : 0 }}
          >
            <Image src={AngkotChecked} width={60} height={63} alt="" />
          </div>
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: !isAngkotChecked ? 1 : 0 }}
          >
            <Image src={AngkotUnchecked} width={60} height={63} alt="" />
          </div>
        </button>
        <button
          className="relative w-[60px] h-[63px]"
          onClick={() => setKeretaChecked(!isKeretaChecked)}
        >
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: isKeretaChecked ? 1 : 0 }}
          >
            <Image src={KeretaChecked} width={60} height={63} alt="" />
          </div>
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: !isKeretaChecked ? 1 : 0 }}
          >
            <Image src={KeretaUnchecked} width={60} height={63} alt="" />
          </div>
        </button>
        <button
          className="relative w-[60px] h-[63px]"
          onClick={() => setSepedaChecked(!isSepedaChecked)}
        >
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: isSepedaChecked ? 1 : 0 }}
          >
            <Image src={SepedaChecked} width={60} height={63} alt="" />
          </div>
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: !isSepedaChecked ? 1 : 0 }}
          >
            <Image src={SepedaUnchecked} width={60} height={63} alt="" />
          </div>
        </button>
        <button
          className="relative w-[60px] h-[63px]"
          onClick={() => setTransitChecked(!isTransitChecked)}
        >
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: isTransitChecked ? 1 : 0 }}
          >
            <Image src={TransitChecked} width={60} height={63} alt="" />
          </div>
          <div
            className="absolute top-0 left-0 w-[60px] h-[63px]"
            style={{ opacity: !isTransitChecked ? 1 : 0 }}
          >
            <Image src={TransitUnchecked} width={60} height={63} alt="" />
          </div>
        </button>
      </div>

      <div className="pl-10 pr-7 mt-6 flex justify-between items-center">
        <h2 className="font-jeko text-xl text-BROWN-700">Perjalananmu</h2>
        <p className="font-poppinsLight text-xs text-BROWN-700">Semua</p>
      </div>

      <ul className="mt-5 pl-10 pr-7 pb-10 mb-20 overflow-auto">
        {histories.map((history, index) => (
          <div key={index} className="flex first:mt-0 mt-2">
            <div className="w-[50px] h-[53px] flex items-center justify-center rounded-xl bg-BLUE-700">
              <Image src={HistoryIcon} width={21} height={21} alt="" />
            </div>
            <div className="ml-4 pt-2">
              <h4 className="font-poppinsBold font-bold text-xs text-BROWN-700">
                {history.location}
              </h4>
              <p className="font-poppinsLight text-GRAY-500 text-[9px] mt-1">
                {history.address}
              </p>
            </div>
          </div>
        ))}
      </ul>
    </main>
  );
}
