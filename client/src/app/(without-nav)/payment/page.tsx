"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ArrowBack from "@/assets/icons/arrow-back.svg";
import MoneyIcon from "@/assets/icons/money-icon.svg";
import CardExample from "@/assets/images/card-example.png";
import DashedBorder from "@/assets/icons/dashed-border.svg";
import GopayLogo from "@/assets/images/gopay-logo.png";
import DanaLogo from "@/assets/images/dana-logo.png";
import useSession from "@/hooks/useSession";
import Cookies from "js-cookie";

export default function PaymentPage(): JSX.Element {
  useSession();

  const [total, setTotal] = useState("");
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    setTotal("Rp. 16.000,00");
  }, []);

  if (Cookies.get("jwt")) {
    return (
      <main className="pb-12">
        <div className="flex items-center w-[86vw] mx-auto pt-8">
          <Link href="/route-finding">
            <Image src={ArrowBack} width={25} height={10} alt="" />
          </Link>
          <h3 className="text-BROWN-600 font-jeko text-xl ml-6">Pembayaran</h3>
        </div>

        <div className="bg-GRAY-400 w-[86vw] mt-6 rounded-[20px] p-4 flex items-center mx-auto">
          <div className="w-[54px] h-[46px] bg-BLUE-500 rounded-[21px] flex items-center justify-center">
            <Image src={MoneyIcon} width={32} height={32} alt="" />
          </div>

          <div className="ml-6">
            <p className="text-BROWN-700 font-poppinsLight text-sm">
              Total Perjalanan
            </p>
            <h2 className="font-poppinsBold text-BROWN-700">{total}</h2>
          </div>
        </div>

        <h3 className="mt-8 font-poppinsLight text-xl text-BROWN-500 w-[86vw] mx-auto">
          Masukkan kode promo
        </h3>

        <div className="mx-auto mt-3 w-[86vw] flex items-center justify-between">
          <input
            type="text"
            className="w-[64.1vw] px-3.5 py-2.5 rounded-[14px] border border-BROWN-700 font-allrounderBook text-xs outline-none"
            placeholder="kode promo"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />

          <button className="w-[63px] bg-BLUE-700 h-[38px] rounded-[14px] ml-3.5"></button>
        </div>

        <p className="mt-2 text-RED-500 text-[10px] font-poppinsLight w-[83vw] mx-auto">
          Kode promo tidak valid!
        </p>

        <h3 className="font-poppinsBold text-black text-xl w-[86vw] mx-auto mt-11">
          Kartu Saya
        </h3>

        <ul className="flex gap-[18px] mt-3.5 overflow-auto px-7">
          <div className="shrink-0">
            <Image src={CardExample} width={250} height={164} alt="" />
          </div>
          <div className="bg-GREEN-600 w-[250px] h-[164px] rounded-[20px] shrink-0" />
        </ul>

        <h3 className="mt-6 font-poppinsLight text-xl text-BROWN-500 w-[86vw] mx-auto">
          Metode lainnya
        </h3>

        <ul className="mt-7 overflow-auto px-7 flex">
          <div className="flex items-center justify-center relative rounded-full w-[59px] h-[59px]">
            <div className="w-[59px] h-[59px] absolute top-0 left-0">
              <Image src={DashedBorder} width={59} height={59} alt="" />
            </div>
            <span className="font-poppinsLight text-black text-[35px]">+</span>
          </div>

          <div className="ml-3 flex flex-col items-center">
            <Image src={GopayLogo} width={58} height={58} alt="" />
            <p className="mt-3 font-poppinsLight text-sm">Gopay</p>
          </div>

          <div className="ml-3 flex flex-col items-center">
            <Image src={DanaLogo} width={58} height={58} alt="" />
            <p className="mt-3 font-poppinsLight text-sm">Dana</p>
          </div>
        </ul>

        <Link href="/ticket">
          <button className="w-[255px] mx-auto py-2 flex items-center justify-center bg-BLUE-700 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-[36px] font-poppinsLight text-white text-sm mt-[62px]">
            Selanjutnya
          </button>
        </Link>
      </main>
    );
  } else {
    return (
      <div className="z-40 fixed left-0 top-0 h-[100vh] w-full bg-white"></div>
    );
  }
}
