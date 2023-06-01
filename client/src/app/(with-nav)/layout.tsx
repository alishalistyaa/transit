"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import HomeSelected from "@/assets/icons/home-selected.svg";
import HomeIcon from "@/assets/icons/home-icon.svg";
import ActivitySelected from "@/assets/icons/activity-selected.svg";
import ActivityIcon from "@/assets/icons/activity-icon.svg";
import TicketSelected from "@/assets/icons/ticket-selected.svg";
import TicketIcon from "@/assets/icons/ticket-icon.svg";
import ProfileSelected from "@/assets/icons/profile-selected.svg";
import ProfileIcon from "@/assets/icons/profile-icon.svg";

import useSession from "@/hooks/useSession";
import Cookies from "js-cookie";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  useSession();

  const currentPath = usePathname();

  if (Cookies.get("jwt")) {
    return (
      <>
        {children}
        <nav className="fixed bottom-0 w-full bg-BROWN-900 rounded-t-[10px]">
          <ul className="w-[271px] mx-auto flex justify-between">
            <Link href="/dashboard">
              <div
                className={clsx(
                  "py-3.5 flex flex-col items-center w-[53px] border-t-[5px]",
                  currentPath === "/dashboard"
                    ? " border-GREEN-300"
                    : "border-transparent"
                )}
              >
                <div className="relative w-[25px] h-[25px]">
                  <div
                    style={{ opacity: currentPath === "/dashboard" ? 1 : 0 }}
                    className="absolute left-0 top-0"
                  >
                    <Image src={HomeSelected} width={25} height={25} alt="" />
                  </div>
                  <div
                    style={{ opacity: currentPath !== "/dashboard" ? 1 : 0 }}
                    className="absolute left-0 top-0"
                  >
                    <Image src={HomeIcon} width={25} height={25} alt="" />
                  </div>
                </div>

                <p
                  className={clsx(
                    "font-poppinsBold text-[8px] mt-3",
                    currentPath === "/dashboard"
                      ? "text-GREEN-300"
                      : "text-white"
                  )}
                >
                  Home
                </p>
              </div>
            </Link>

            <Link href="/activities">
              <div
                className={clsx(
                  "py-3.5 flex flex-col items-center w-[53px] border-t-[5px]",
                  currentPath === "/activities"
                    ? " border-GREEN-300"
                    : "border-transparent"
                )}
              >
                <div className="relative w-[25px] h-[25px]">
                  <div
                    style={{ opacity: currentPath === "/activities" ? 1 : 0 }}
                    className="absolute left-0 top-0"
                  >
                    <Image
                      src={ActivitySelected}
                      width={25}
                      height={25}
                      alt=""
                    />
                  </div>
                  <div
                    style={{ opacity: currentPath !== "/activities" ? 1 : 0 }}
                    className="absolute left-0 top-0"
                  >
                    <Image src={ActivityIcon} width={25} height={25} alt="" />
                  </div>
                </div>

                <p
                  className={clsx(
                    "font-poppinsBold text-[8px] mt-3",
                    currentPath === "/activities"
                      ? "text-GREEN-300"
                      : "text-white"
                  )}
                >
                  Aktivitas
                </p>
              </div>
            </Link>

            <Link href="/ticket">
              <div
                className={clsx(
                  "py-3.5 flex flex-col items-center w-[53px] border-t-[5px]",
                  currentPath === "/ticket"
                    ? " border-GREEN-300"
                    : "border-transparent"
                )}
              >
                <div className="relative w-[25px] h-[25px]">
                  <div
                    style={{ opacity: currentPath === "/ticket" ? 1 : 0 }}
                    className="absolute left-0 top-0"
                  >
                    <Image src={TicketSelected} width={25} height={25} alt="" />
                  </div>
                  <div
                    style={{ opacity: currentPath !== "/ticket" ? 1 : 0 }}
                    className="absolute left-0 top-0"
                  >
                    <Image src={TicketIcon} width={25} height={25} alt="" />
                  </div>
                </div>

                <p
                  className={clsx(
                    "font-poppinsBold text-[8px] mt-3",
                    currentPath === "/ticket" ? "text-GREEN-300" : "text-white"
                  )}
                >
                  Tiketmu
                </p>
              </div>
            </Link>

            <Link href="/">
              <div
                className={clsx(
                  "py-3.5 flex flex-col items-center w-[53px] border-t-[5px]",
                  currentPath === "/profile"
                    ? " border-GREEN-300"
                    : "border-transparent"
                )}
              >
                <div className="relative w-[25px] h-[25px]">
                  <div
                    style={{ opacity: currentPath === "/profile" ? 1 : 0 }}
                    className="absolute left-0 top-0"
                  >
                    <Image
                      src={ProfileSelected}
                      width={25}
                      height={25}
                      alt=""
                    />
                  </div>
                  <div
                    style={{ opacity: currentPath !== "/profile" ? 1 : 0 }}
                    className="absolute left-0 top-0"
                  >
                    <Image src={ProfileIcon} width={25} height={25} alt="" />
                  </div>
                </div>

                <p
                  className={clsx(
                    "font-poppinsBold text-[8px] mt-3",
                    currentPath === "/profile" ? "text-GREEN-300" : "text-white"
                  )}
                >
                  Profile
                </p>
              </div>
            </Link>
          </ul>
        </nav>
      </>
    );
  } else {
    return (
      <div className="z-40 fixed left-0 top-0 h-[100vh] w-full bg-white"></div>
    );
  }
}
