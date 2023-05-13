/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "GRAY-100": "#F8F8FF",
        "GRAY-300": "#F5F5F5",
        "GRAY-500": "#898989",
        "GREEN-500": "#459B8E",
        "GREEN-600": "#54A382",
        "BLUE-700": "#00386C",
        "BROWN-700": "#58585B",
      },
      fontFamily: {
        jeko: ["var(--font-jeko)"],
        allrounderBook: ["var(--font-allrounder-book)"],
        allrounderRegular: ["var(--font-allrounder-regular)"],
        poppinsLight: ["var(--font-poppins-light)"],
        poppinsBold: ["var(--font-poppins-bold)"],
      },
    },
  },
  plugins: [],
};
