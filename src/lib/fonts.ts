import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const generalSans = localFont({
  src: [
    {
      path: "../assets/fonts/GeneralSans-Variable.woff2",
      style: "normal",
      weight: "200 700",
    },
    {
      path: "../assets/fonts/GeneralSans-VariableItalic.woff2",
      style: "italic",
      weight: "200 700",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});
