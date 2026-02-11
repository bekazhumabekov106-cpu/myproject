import { useState, useEffect, useMemo } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

// Ограничиваем количество фоновых фото
const images = [
  "/game-photos/1.avif",
  "/game-photos/2.avif",
  "/game-photos/3.avif",
  "/game-photos/4.avif",
  "/game-photos/5.avif",
  "/game-photos/6.avif",
  "/game-photos/7.avif",
  "/game-photos/8.avif",
  "/game-photos/9.avif",
  "/game-photos/10.avif",
  "/game-photos/11.avif",
  "/game-photos/12.avif",
];

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{ top: string; left: string } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useEffect(() => {
    if (step < 2) {
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 70;
    const randomLeft = Math.random() * 70;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
  };

  const backgroundImages = useMemo(() => {
    return images.map((src, index) => (
      <div key={index} className="relative w-full aspect-square">
        <Image
          src={src}
          alt={`Memory ${index + 1}`}
          fill
          sizes="(max-width: 768px) 33vw, 16vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
    ));
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 text-center">

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
            key="step-0"
            className={`text-3xl md:text-4xl font-semibold ${playfairDisplay.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Ты завершила игру. Теперь позволь мне сделать следующий шаг…
          </motion.h2>
        )}

        {step === 1 && (
          <motion.h2
            key="step-1"
            className={`text-3xl md:text-4xl font-semibold ${playfairDisplay.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            У меня есть для тебя сюрприз!
          </motion.h2>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Фоновая сетка (оптимизированная) */}
            <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 opacity-10 pointer-events-none">
              {backgroundImages}
            </div>

            <h2 className={`text-4xl md:text-5xl font-semibold mb-6 relative z-10 ${playfairDisplay.className}`}>
              Ты будешь моей валентинкой?
            </h2>

            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={180}
              height={180}
              priority
            />

            <div className="flex space-x-4 mt-8 relative z-10">
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:scale-105 transition-all"
                onClick={handleYesClick}
              >
                Да, я буду! 🥰
              </button>

              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gray-500 rounded-xl transition-all"
                style={
                  position
                    ? { position: "absolute", top: position.top, left: position.left }
                    : {}
                }
                onMouseEnter={() => !isMobile && setPosition(getRandomPosition())}
                onClick={() => setPosition(getRandomPosition())}
              >
                Нет, не буду 😢
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            className={`flex flex-col items-center text-3xl md:text-4xl ${playfairDisplay.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Спасибо, что приняла мое приглашение.
            <br />
            Я тебя люблю. 💕

            <p className="text-sm mt-4">
              За подробностями напиши мне… я жду твоего сообщения. 💌
            </p>

            <Image
              src="/hamster_jumping.gif"
              alt="Hamster Feliz"
              width={180}
              height={180}
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Фейерверк только на десктопе */}
      {showFireworks && !isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <Fireworks
            options={{ autoresize: true }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
