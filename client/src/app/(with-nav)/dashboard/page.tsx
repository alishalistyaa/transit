"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import CurrentLocation from "@/components/CurrentLocation";
import DestinationInput from "@/components/DestinationInput";

import SearchIcon from "@/assets/icons/search-icon.svg";
import CardBackground from "@/assets/images/dashboard-card.png";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
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

type history = {
  location: string;
  address: string;
};

export default function DashboardPage(): JSX.Element {
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [destination, setDestination] = useState("");

  const [isBisChecked, setBisChecked] = useState(false);
  const [isAngkotChecked, setAngkotChecked] = useState(false);
  const [isKeretaChecked, setKeretaChecked] = useState(false);
  const [isSepedaChecked, setSepedaChecked] = useState(false);
  const [isTransitChecked, setTransitChecked] = useState(false);

  const [histories, setHistories] = useState<history[]>([]);

  useEffect(() => {
    setAddress("Jl. Bojongsoang No.3");
    setUsername("Vanessa Rebecca");
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
  }, []);

  return (
    <main>
      <div className="w-full flex items-center justify-between px-7 pt-12">
        <Image src={TransitLogo} width={59} height={66} alt="Transit Logo" />

        <CurrentLocation address={address} />
      </div>

      <h1 className="font-jeko text-xl tracking-[0.02] mt-11 mx-10 text-BROWN-700">
        Hi, <span className="text-GREEN-500">{username}</span> <br /> Mau kemana
        hari ini?
      </h1>

      <div className="mt-4">
        <DestinationInput
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        />
      </div>

      <div className="relative w-[337px] h-[174px] bg-BLUE-700 rounded-3xl mt-4 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)] mx-auto px-4 pt-10 overflow-hidden">
        <div className="absolute w-[337px] h-[154px] top-4 left-0 -z-10">
          <Image src={CardBackground} fill={true} alt="" />
        </div>

        <h2 className="font-jeko text-white text-xl">Nikmati</h2>
        <p className="text-white font-poppinsLight text-[8px]">
          Perjalanan pertamamu
          <br />
          bersama kami!
        </p>

        <button className="w-[92px] h-[29px] flex items-center justify-center bg-GREEN-600 mt-3.5 rounded-xl">
          <Image src={ArrowRight} width={20} height={10} alt="" />
        </button>
      </div>

      <h2 className="font-jeko text-xl text-BROWN-700 tracking-[0.02] mt-6 ml-10">
        Moda Transportasi
      </h2>

      {/* TODO: Set this toggle button to change opacity */}
      <div className="flex justify-between items-center px-8 w-full mt-3.5">
        <button onClick={() => setBisChecked(!isBisChecked)}>
          <Image
            src={isBisChecked ? BisChecked : BisUnchecked}
            width={60}
            height={63}
            alt=""
          />
        </button>
        <button onClick={() => setAngkotChecked(!isAngkotChecked)}>
          <Image
            src={isAngkotChecked ? AngkotChecked : AngkotUnchecked}
            width={60}
            height={63}
            alt=""
          />
        </button>
        <button onClick={() => setKeretaChecked(!isKeretaChecked)}>
          <Image
            src={isKeretaChecked ? KeretaChecked : KeretaUnchecked}
            width={60}
            height={63}
            alt=""
          />
        </button>
        <button onClick={() => setSepedaChecked(!isSepedaChecked)}>
          <Image
            src={isSepedaChecked ? SepedaChecked : SepedaUnchecked}
            width={60}
            height={63}
            alt=""
          />
        </button>
        <button onClick={() => setTransitChecked(!isTransitChecked)}>
          <Image
            src={isTransitChecked ? TransitChecked : TransitUnchecked}
            width={60}
            height={63}
            alt=""
          />
        </button>
      </div>

      <div className="pl-10 pr-7 mt-6 flex justify-between items-center">
        <h2 className="font-jeko text-xl text-BROWN-700">Perjalananmu</h2>
        <p className="font-poppinsLight text-xs text-BROWN-700">Semua</p>
      </div>

      <ul className="mt-5 pl-10 pr-7 pb-10">
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
