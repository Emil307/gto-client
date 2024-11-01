import { Roboto, Rubik } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "500", "700", "900"],
  style: ["normal"],
  variable: "--font-roboto",
});

export const rubik = Rubik({
  subsets: ["cyrillic"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-rubik",
});

export const TTSquare = localFont({
  src: [
    {
      path: "../../../app/fonts/TTSquares-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../app/fonts/TTSquares-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ttsquare",
});
