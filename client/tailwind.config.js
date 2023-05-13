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
        "GRAY-400": "#F0F0F0",
        "GRAY-500": "#898989",
        "GRAY-600": "#D9D9D9",
        "GRAY-700": "#B1B1B1",
        "GRAY-800": "#989898",
        "GRAY-900": "#B1B1B1",
        "GREEN-400": "#4E917633",
        "GREEN-500": "#459B8E",
        "GREEN-600": "#54A382",
        "GREEN-700": "#54A382",
        "BLUE-500": "#006DB0",
        "BLUE-700": "#00386C",
        "BROWN-700": "#58585B",
        "BROWN-800": "#393939",
        "YELLOW-500": "#FFB75A",
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
