import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function TextFooter() {
  return (
    <>
      {/* Left Text */}
      <h1
  className={`absolute left-10 bottom-5 transform -translate-y-1/2 text-white text-3xl lg:text-4xl font-bold leading-tight ${playfairDisplay.className}`}
>
  <span className="text-gray-400">Собери</span> <br /> все пары фото
</h1>
<h1
        className={`absolute left-10 bottom-5 transform -translate-y-1/2 text-white text-4xl lg:text-5xl font-bold leading-tight ${playfairDisplay.className}`}
      >
        <span className="text-gray-400">Собери</span> <br /> все пары фото
      </h1>

      {/* Right Text */}
      <h1
        className={`absolute right-10 bottom-5 transform -translate-y-1/2 text-white text-4xl lg:text-5xl font-bold leading-tight text-right ${playfairDisplay.className}`}
      >
        чтобы открыть <br /> <span className="text-gray-400">сюрприз💝</span>
      </h1>



      {/* Copyright */}
      <p className="absolute bottom-5 right-5 text-white text-sm opacity-15 hover:opacity-50">
        © {new Date().getFullYear()}{" "}
        
      </p>
    </>
  );
}
