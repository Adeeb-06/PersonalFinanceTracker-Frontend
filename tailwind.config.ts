import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import { Secular_One } from "next/font/google";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
       
    },
  },
  plugins: [daisyui],
};

export default config;
