import Link from "next/link";

export default function Home() {
  return (
    <main className="h-[100vh] w-full flex flex-col justify-between">
      <div className="h-[60.5vh] bg-BROWN-900 relative flex flex-col-reverse pb-6 rounded-b-[50px]">
        <h1 className="text-white font-poppinsBold tracking-[0.5px] text-[40px] w-[80.5vw] mx-auto">
          TransIT
        </h1>

        <h2
          style={{
            background:
              "linear-gradient(84.89deg, #B6F5F6 5.06%, rgba(182,245,256,0) 60.37%), #65FFB3",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="w-[80.5vw] mx-auto font-poppinsLight text-[30px] tracking-[0.5px] bg-clip-text text-transparent"
        >
          Selamat datang !
        </h2>
      </div>

      <div className="h-[39.5vh] flex flex-col items-center justify-center">
        <Link href="/login">
          <button className="w-[250px] border border-BROWN-900 rounded-3xl bg-white flex items-center justify-center font-poppinsBold text-BROWN-900 tracking-[0.5px] py-2">
            Log In
          </button>
        </Link>

        <div className="mt-4">
          <Link href="/signup">
            <button className="w-[250px] border border-BROWN-900 rounded-3xl bg-white flex items-center justify-center font-poppinsBold text-BROWN-900 tracking-[0.5px] py-2">
              Register
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
