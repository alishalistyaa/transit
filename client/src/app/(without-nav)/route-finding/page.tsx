"use client";

import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  OverlayView,
  GoogleMapProps,
  Polyline,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CarIcon from "@/assets/icons/car-icon.svg";
import Checklist from "@/assets/icons/checklist.svg";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import useSession from "@/hooks/useSession";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

const MAPS_API_KEY = "AIzaSyAoFTL5YjSh3urWT3I1896Cp1F3TdCMsq8";

const containerStyle = {
  width: "100vw",
  height: "70vh",
};

type stop = {
  lat: number;
  lng: number;
  name: string;
  address: string;
};

export default function RouteFindingPage(): JSX.Element {
  useSession();

  const searchParam = useSearchParams();

  const destLat = parseFloat(searchParam.get("destLat") || "0");
  const destLng = parseFloat(searchParam.get("destLng") || "0");
  const destName = searchParam.get("destName");
  const stopId = searchParam.get("stopId");
  const currLat = parseFloat(searchParam.get("currLat") || "0");
  const currLng = parseFloat(searchParam.get("currLng") || "0");
  const currName = searchParam.get("currName");

  const [route, setRoute] = useState("");
  const [routeAddress, setRouteAddress] = useState("");
  const [destination, setDestination] = useState("");

  const [firstStopLat, setFirstStopLat] = useState(0);
  const [firstStopLng, setFirstStopLng] = useState(0);

  const [lastStopLat, setLastStopLat] = useState(0);
  const [lastStopLng, setLastStopLng] = useState(0);

  const [firstPath, setFirstPath] = useState<google.maps.LatLng[]>([]);
  const [lastPath, setLastPath] = useState<google.maps.LatLng[]>([]);

  const [stops, setStops] = useState<stop[]>([]);

  const center = {
    lat: (destLat + currLat) / 2,
    lng: (destLng + currLng) / 2,
  };

  const lineSymbolRed = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 4,
    strokeColor: "#FA6B70",
  };

  const lineSymbolYellow = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 4,
    strokeColor: "#FFB75A",
  };

  const MAPS_API_KEY = "AIzaSyAoFTL5YjSh3urWT3I1896Cp1F3TdCMsq8";

  useEffect(() => {
    const fetchRoute = async () => {
      return await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/routes/?destLat=${destLat}&destLng=${destLng}&stopId=${stopId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
    };

    fetchRoute()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const temp: stop[] = [];
        data.message.Stops.forEach((stop: any) => {
          temp.push({
            lat: stop.Lat,
            lng: stop.Lng,
            name: stop.Name,
            address: stop.Address,
          });
        });
        setStops(temp);

        setFirstStopLat(data.message.Stops[0].Lat);
        setFirstStopLng(data.message.Stops[0].Lng);

        setLastStopLat(data.message.Stops[data.message.Stops.length - 1].Lat);
        setLastStopLng(data.message.Stops[data.message.Stops.length - 1].Lng);

        return fetch(
          `https://roads.googleapis.com/v1/snapToRoads?path=${encodeURIComponent(
            `${currLat},${currLng}|${data.message.Stops[0].Lat},${data.message.Stops[0].Lng}`
          )}&interpolate=true&key=${MAPS_API_KEY}`
        );
      })
      .then((res) => res.json())
      .then((data) => {
        const temp: google.maps.LatLng[] = [];
        data.snappedPoints.forEach((point: any) =>
          temp.push({
            lat: point.location.latitude,
            lng: point.location.longitude,
          } as google.maps.LatLng)
        );
        setFirstPath(temp);

        if (data.warningMessage) {
          const newTemp: google.maps.LatLng[] = [];
          newTemp.push({
            lat: currLat as any,
            lng: currLng as any,
          } as google.maps.LatLng);
          newTemp.push({
            lat: firstStopLat as any,
            lng: firstStopLng as any,
          } as google.maps.LatLng);
          setFirstPath(newTemp);
        }

        return fetch(
          `https://roads.googleapis.com/v1/snapToRoads?path=${encodeURIComponent(
            `${destLat},${destLng}|${lastStopLat},${lastStopLng}`
          )}&interpolate=true&key=${MAPS_API_KEY}`
        );
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const temp: google.maps.LatLng[] = [];
        data.snappedPoints.forEach((point: any) =>
          temp.push({
            lat: point.location.latitude,
            lng: point.location.longitude,
          } as google.maps.LatLng)
        );
        setLastPath(temp);

        if (data.warningMessage) {
          const newTemp: google.maps.LatLng[] = [];
          newTemp.push({
            lat: destLat as any,
            lng: destLng as any,
          } as google.maps.LatLng);
          newTemp.push({
            lat: lastStopLat as any,
            lng: lastStopLng as any,
          } as google.maps.LatLng);
          setLastPath(newTemp);
        }
      })
      .catch((err) => console.error(err));

    setRoute("Dago - Cicaheum");
    setRouteAddress("Jalan Dago Bawah No.32");
    setDestination("Jalan Sultan Tirtayasa No.50");
  }, [
    destLat,
    destLng,
    stopId,
    currLat,
    currLng,
    lastStopLat,
    lastStopLng,
    firstStopLat,
    firstStopLng,
  ]);

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
              onClick={(e) => {
                const temp = e.latLng?.toJSON();
              }}
            >
              <OverlayView
                position={{
                  lat: currLat || 0,
                  lng: currLng || 0,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="w-[120px] bg-GREEN-500 rounded-[11px] py-2 px-3 translate-x-[-60px] -translate-y-[120%] relative">
                  <p className="font-poppinsBold text-[8px] text-white">
                    {currName}
                  </p>
                  <div className="absolute -bottom-1 rotate-45 w-4 bg-GREEN-500 -z-10 h-4 left-[53px]"></div>
                </div>
              </OverlayView>

              <OverlayView
                position={{
                  lat: destLat || 0,
                  lng: destLng || 0,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="w-[120px] bg-GREEN-500 rounded-[11px] py-2 px-3 translate-x-[-60px] -translate-y-[120%] relative">
                  <p className="font-poppinsBold text-[8px] text-white">
                    {destName}
                  </p>
                  <div className="absolute -bottom-1 rotate-45 w-4 bg-GREEN-500 -z-10 h-4 left-[53px]"></div>
                </div>
              </OverlayView>

              {stops.map((stop, idx) => (
                <OverlayView
                  key={idx}
                  position={{
                    lat: stop.lat || 0,
                    lng: stop.lng || 0,
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="w-[60px] bg-BLUE-700 rounded-[20px] py-1.5 px-2 flex items-center justify-center -translate-x-[50%] -translate-y-[50%]">
                    <p className=" font-poppinsBold text-[8px] text-white">
                      Transit
                    </p>
                  </div>
                </OverlayView>
              ))}

              <Polyline
                path={firstPath}
                options={{
                  strokeColor: "#FA6B70",
                }}
              />
              <Polyline
                path={lastPath}
                options={{
                  strokeColor: "#FFB75A",
                }}
              />

              {
                <Polyline
                  path={stops.map((stop, idx) => {
                    return {
                      lat: stop.lat || 0,
                      lng: stop.lng || 0,
                    };
                  })}
                />
              }
            </GoogleMap>
          </LoadScript>
        </div>

        <Link href="/buy-ticket">
          <div className="absolute left-6 top-5 bg-white rounded-full border border-GRAY-600 w-[52px] h-[52px] flex items-center justify-center">
            <Image src={ArrowBack} width={25} height={10} alt="" />
          </div>
        </Link>

        <div className="fixed bottom-0 w-full h-[260px] bg-white rounded-t-[50px]">
          <div className="flex justify-between pl-9 pr-8 pt-[50px] items-center">
            <div>
              <h3 className="font-poppinsBold text-lg text-black">Rute</h3>
              <p className="font-poppinsLight text-xs text-black mt-1">
                {"Nama Rute"}
              </p>
            </div>

            <Link
              href={`/payment?destLat=${destLat}&destLng=${destLng}&stopId=${stopId}&currLat=${currLat}&currLng=${currLng}&destName=${destName}&currName=${currName}`}
            >
              <button className="bg-BLUE-700 w-[122px] h-[35px] flex items-center justify-center font-poppinsLight text-white text-xs rounded-[36px]">
                Beli Tiket
              </button>
            </Link>
          </div>

          <div className="flex justify-center mt-6 h-[140px] overflow-scroll py-1">
            <div className="flex flex-col items-center shrink-0">
              <div className="flex items-center justify-center rounded-full bg-YELLOW-500 w-[43px] h-[43px] shrink-0">
                <Image src={CarIcon} width={28} height={28} alt="" />
              </div>

              <div className="h-5 w-[3px] bg-GRAY-900 shrink-0" />
              <div className="w-2.5 h-2.5 rounded-full bg-GRAY-900 mt-[-1px] shrink-0" />

              {stops.slice(0, stops.length - 1).map(() => (
                <>
                  <div className="h-[45px] w-[3px] bg-GRAY-900 shrink-0" />
                  <div className="w-2.5 h-2.5 rounded-full bg-GRAY-900 mt-[-1px] shrink-0" />
                </>
              ))}

              <div className="h-8 w-[3px] bg-GRAY-900 shrink-0" />

              <div className="bg-GREEN-600 w-[43px] h-[44px] rounded-full flex items-center justify-center shrink-0">
                <Image src={Checklist} width={19} height={15} alt="" />
              </div>

              <div className="h-[20px] w-[1px] shrink-0"></div>
            </div>

            <div className="ml-6 shrink-0">
              <h3 className="font-poppinsBold text-xs text-black mt-1">
                {"Name Rute"}
              </h3>
              <p className="font-poppinsLight text-[10px] text-black mt-0.5">
                {currName}
              </p>

              {stops.map((stop, idx) => (
                <div key={idx}>
                  <h3 className="font-poppinsBold text-xs text-black mt-5">
                    {stop.name}
                  </h3>
                  <p className="font-poppinsLight text-[10px] text-black mt-0.5">
                    {stop.address}
                  </p>
                </div>
              ))}

              <h3 className="font-poppinsBold text-xs text-GREEN-600 mt-6">
                Sampai tujuan!
              </h3>
              <p className="font-poppinsLight text-[10px] text-black mt-0.5">
                {destName}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <div className="z-40 fixed left-0 top-0 h-[100vh] w-full bg-white"></div>
    );
  }
}
