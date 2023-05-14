"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import InputField from "@/components/InputField";

import ArrowRight from "@/assets/icons/arrow-right.svg";

export default function SignupPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="h-[100vh] w-full flex flex-col items-center justify-center">
      <h1 className="w-[64.1vw] tracking-[0.2px] font-jeko text-[32px] text-BROWN-600">
        Login
      </h1>

      <div className="mt-4">
        <InputField
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email address"
          value={email}
          isPassword={false}
        />
      </div>

      <div className="mt-4">
        <InputField
          onChange={(e) => setPassword(e.target.value)}
          placeholder="create password"
          value={password}
          isPassword={true}
        />
      </div>

      <div className="w-[64.1vw] flex flex-col items-end mt-5">
        <Link href="/">
          <p className="font-poppinsLight tracking-[0.2px] text-[10px] text-[#959595] mb-12 text-center w-[102px]">
            Lupa password?
          </p>
        </Link>

        <Link href="/dashboard">
          <button className="bg-BROWN-900 w-[102px] rounded-[10px] flex items-center justify-between pl-3.5 pr-2.5 py-2">
            <p className="font-jeko text-white text-xs tracking-[0.2px] pt-0.5">
              Next
            </p>
            <Image src={ArrowRight} width={13} height={5} alt="" />
          </button>
        </Link>
      </div>
    </main>
  );
}
