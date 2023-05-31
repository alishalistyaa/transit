"use client";

import useSession from "@/hooks/useSession";
import clsx from "clsx";
import { useEffect, useState } from "react";

type activity = {
  location: string;
  isCompleted: boolean;
  date: Date;
  price: string;
};

export default function ActivitesPage(): JSX.Element {
  useSession();

  const [activites, setActivites] = useState<activity[]>();

  useEffect(() => {
    setActivites([
      {
        location: "Miko Mall",
        isCompleted: false,
        date: new Date(2023, 4, 11, 15, 13, 0),
        price: "Rp21.000",
      },
      {
        location: "Miko Mall",
        isCompleted: true,
        date: new Date(2023, 4, 11, 15, 13, 0),
        price: "Rp21.000",
      },
      {
        location: "Miko Mall",
        isCompleted: true,
        date: new Date(2023, 4, 11, 15, 13, 0),
        price: "Rp21.000",
      },
      {
        location: "Miko Mall",
        isCompleted: true,
        date: new Date(2023, 4, 11, 15, 13, 0),
        price: "Rp21.000",
      },
      {
        location: "Miko Mall",
        isCompleted: true,
        date: new Date(2023, 4, 11, 15, 13, 0),
        price: "Rp21.000",
      },
      {
        location: "Miko Mall",
        isCompleted: true,
        date: new Date(2023, 4, 11, 15, 13, 0),
        price: "Rp21.000",
      },
      {
        location: "Miko Mall",
        isCompleted: true,
        date: new Date(2023, 4, 11, 15, 13, 0),
        price: "Rp21.000",
      },
    ]);
  }, []);

  return (
    <main className="w-[79.7vw] mx-auto">
      <h1 className="text-BROWN-600 font-jeko text-[32px] mt-[70px]">
        Aktivitas
      </h1>

      <ul className="overflow-auto max-h-[70.5vh] mt-6 pb-16">
        {activites?.map((activity, index) => (
          <div
            key={index}
            className={clsx(
              "flex justify-between pl-5 pr-4 py-4 rounded-[10px] first:mt-0 mt-4",
              activity.isCompleted ? "bg-GRAY-400" : "bg-GREEN-700"
            )}
          >
            <div>
              <h3 className="font-jeko text-BROWN-800">{activity.location}</h3>
              <p className="font-poppinsLight text-BROWN-800 mt-1 text-[10px]">
                {activity.isCompleted ? "Completed" : "On Going"}
              </p>
              <p className="font-poppinsLight text-BROWN-800 mt-1 text-[10px]">
                {activity.date
                  .getDate()
                  .toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
                  " " +
                  activity.date.toLocaleString("default", { month: "long" }) +
                  ", " +
                  activity.date
                    .getHours()
                    .toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
                  ":" +
                  activity.date
                    .getMinutes()
                    .toLocaleString("en-US", { minimumIntegerDigits: 2 })}
              </p>
            </div>

            <p className="font-poppinsLight text-BROWN-800 text-[10px]">
              {activity.price}
            </p>
          </div>
        ))}
      </ul>
    </main>
  );
}
