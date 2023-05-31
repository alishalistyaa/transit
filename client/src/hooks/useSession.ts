import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useSession() {
  const router = useRouter();

  useEffect(() => {
    if (!router) {
      return;
    }

    const checkSession = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/validate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    };
    // checkSession().then((res) => (!res.ok ? router.push("/login") : null));
  }, [router]);
}
