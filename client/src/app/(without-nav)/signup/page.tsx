"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import InputField from "@/components/InputField";

import ArrowRight from "@/assets/icons/arrow-right.svg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SignupPage(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== confirmPass) {
      alert("Password does not match");
      return;
    }

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const { message } = await res.json();

    if (res.ok && message) {
      Cookies.set("jwt", message);
      router.push("/dashboard");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <main className="h-[100vh] w-full flex flex-col items-center justify-center">
      <h1 className="w-[64.1vw] tracking-[0.2px] font-jeko text-[32px] text-BROWN-600">
        Register
      </h1>

      <div className="mt-4">
        <InputField
          onChange={(e) => setName(e.target.value)}
          placeholder="full name"
          value={name}
          isPassword={false}
        />
      </div>

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

      <div className="mt-4">
        <InputField
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="repeat password"
          value={confirmPass}
          isPassword={true}
        />
      </div>

      <div className="w-[64.1vw] flex justify-end mt-14">
        {/* <Link href="/dashboard"> */}
        <button
          className="bg-BROWN-900 w-[102px] rounded-[10px] flex items-center justify-between pl-3.5 pr-2.5 py-2"
          onClick={handleSubmit}
        >
          <p className="font-jeko text-white text-xs tracking-[0.2px] pt-0.5">
            Next
          </p>
          <Image src={ArrowRight} width={13} height={5} alt="" />
        </button>
        {/* </Link> */}
      </div>
    </main>
  );
}
