"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import QRImage from "@/assets/images/qr-image.png";
import useSession from "@/hooks/useSession";

export default function TicketPage(): JSX.Element {
  useSession();

  const [date, setDate] = useState<Date>();
  const [code, setCode] = useState(0);

  useEffect(() => {
    setDate(new Date(2023, 5, 7, 12, 0, 0));
    setCode(198010);
  }, []);

  return (
    <main className="w-[79.7vw] mx-auto pb-[120px]">
      <h1 className="text-BROWN-600 font-jeko text-[32px] mt-[70px]">
        Tiket Saya
      </h1>
      <p className="font-poppinsLight text-BROWN-700 mt-6">
        Lihat nomor kendaraanmu dengan benar. Pastikan kamu memindai barcode di
        scanner pada kendaraan!
      </p>

      <div className="flex flex-col items-center w-full pt-11 pb-6 rounded-[20px] border-2 border-BLUE-700 mt-12">
        <div className="w-[58.5vw] max-w-[209px] flex justify-between">
          <div className="bg-GREEN-600 rounded-[10px] w-[148px] py-1.5 pl-4 shadow-[2px_2px_4px_rgba(0,0,0,0.25)]">
            <p className="text-white font-poppinsLight text-xs">
              {date?.toDateString()}
            </p>
          </div>

          <div className="bg-GREEN-600 rounded-[10px] py-1.5 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] flex justify-center w-[51px] ml-2.5">
            <p className="font-poppinsLights text-white text-xs">
              {date
                ?.getHours()
                .toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
                "." +
                date
                  ?.getMinutes()
                  .toLocaleString("en-US", { minimumIntegerDigits: 2 })}
            </p>
          </div>
        </div>

        <Image src={QRImage} width={271} height={271} alt="" />

        <h3 className="font-poppinsLight text-BROWN-700 w-full text-center -mt-2">
          Kode Pembayaran
        </h3>
        <p className="font-poppinsBold text-BROWN-900 w-full text-center text-3xl tracking-[0.05em]">
          {code}
        </p>
      </div>
    </main>
  );
}
