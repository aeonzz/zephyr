import { Baskervville, Geist, Geist_Mono } from "next/font/google";

const baskerVvile = Baskervville({
  weight: ["400"],
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export { baskerVvile, geist, geistMono };
