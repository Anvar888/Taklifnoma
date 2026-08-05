import React, { useState } from 'react';
import { Mail, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlace, setSelectedPlace] = useState<string>('☕ Kafe');
  const [selectedTime, setSelectedTime] = useState<string>('🕕 Shanba, 18:00');

  const places = ['☕ Kafe', '🍽️ Restoran', '🎬 Kino'];
  const times = ['🕕 Shanba, 18:00', '🕓 Yakshanba, 16:00'];

  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          place: selectedPlace,
          time: selectedTime,
        }),
      });
      const data = await response.json();

await fetch('/api/telegram', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: `🎉 Yangi taklifnoma javobi!

📍 Joy: ${selectedPlace}
⏰ Vaqt: ${selectedTime}`
  }),
});

setStep(3);
    } catch (error) {
      console.error('Error sending response:', error);
      setStep(3);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8FA] flex items-center justify-center p-4 font-sans text-[#444]">
      {/* Main Card Container */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-6 sm:p-8 custom-shadow border border-[#F8D7E5]/60 text-center relative overflow-hidden">
        
        {/* Pink circular envelope icon at top */}
        <div className="w-16 h-16 rounded-full bg-[#F8D7E5] flex items-center justify-center mx-auto mb-5 text-[#E91E63] shadow-sm">
          <Mail className="w-8 h-8 text-[#E91E63]" />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Title */}
              <p className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#E91E63] uppercase mb-1">
                MAXSUS TAKLIFNOMA
              </p>

              {/* Large script name */}
              <h1 className="font-script text-5xl sm:text-6xl text-[#E91E63] my-1 font-normal leading-tight">
                Xolidaxon
              </h1>

              {/* Heart separator */}
              <div className="flex items-center justify-center my-3">
                <Heart className="w-4 h-4 text-[#E91E63] fill-[#E91E63]" />
              </div>

              {/* Quote card */}
              <div className="bg-[#FDF8FA] border border-[#F8D7E5] rounded-2xl p-5 my-5 quote-shadow text-center">
                <p className="font-serif italic text-lg sm:text-xl text-[#444] leading-relaxed">
                  "Har bir kun Siz bilan yanada mazmunli bo'lishiga ishonaman.
                  Birga vaqt o'tkazsak, men uchun katta baxt bo'lardi."
                </p>
              </div>

              {/* Question text */}
              <p className="text-sm font-medium text-[#555] mb-6">
                Men bilan uchrashishga rozi bo'lasizmi?
              </p>

              {/* Main Button */}
              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 sm:py-4 px-6 bg-[#E91E63] hover:bg-[#d81b60] text-white font-semibold text-lg rounded-full shadow-lg shadow-[#E91E63]/25 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                Ha 💖
              </button>

              {/* Signature */}
              <p className="font-serif italic text-[#777] text-right text-base sm:text-lg mt-6 sm:mt-8">
                — Anvar
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Title */}
              <h2 className="font-sans text-2xl font-bold text-[#333] mb-1">
                Ajoyib! 🎉
              </h2>

              <p className="font-sans text-sm font-medium text-[#E91E63] mt-5 mb-3">
                Qayerga boramiz?
              </p>

              {/* Place Pills */}
              <div className="flex flex-col gap-2.5">
                {places.map((place) => {
                  const isSelected = selectedPlace === place;
                  return (
                    <button
                      key={place}
                      onClick={() => setSelectedPlace(place)}
                      className={`w-full py-3 px-5 rounded-full font-medium text-base transition-all duration-200 cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#E91E63] text-white shadow-md shadow-[#E91E63]/20'
                          : 'bg-white text-[#444] border border-[#F8D7E5] hover:border-[#E91E63]/50'
                      }`}
                    >
                      {place}
                    </button>
                  );
                })}
              </div>

              <p className="font-sans text-sm font-medium text-[#E91E63] mt-6 mb-3">
                Qachon?
              </p>

              {/* Time Pills */}
              <div className="flex flex-col gap-2.5">
                {times.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`w-full py-3 px-5 rounded-full font-medium text-base transition-all duration-200 cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#E91E63] text-white shadow-md shadow-[#E91E63]/20'
                          : 'bg-white text-[#444] border border-[#F8D7E5] hover:border-[#E91E63]/50'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                className="w-full mt-7 py-3.5 sm:py-4 px-6 bg-[#E91E63] hover:bg-[#d81b60] text-white font-semibold text-lg rounded-full shadow-lg shadow-[#E91E63]/25 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                Yuborish 💌
              </button>

              {/* Signature */}
              <p className="font-serif italic text-[#777] text-right text-base sm:text-lg mt-6">
                — Anvar
              </p>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Large script title */}
              <h1 className="font-script text-5xl sm:text-6xl text-[#E91E63] mb-2 leading-tight">
                Ajoyib! 🎉
              </h1>

              {/* Small text */}
              <p className="text-sm font-medium text-[#555] mb-6">
                Javobingiz yuborildi ❤️
              </p>

              {/* Summary container */}
              <div className="bg-[#FDF8FA] border border-[#F8D7E5] rounded-2xl p-5 my-5 space-y-3.5 text-center quote-shadow">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-xs uppercase tracking-wider text-[#888] font-semibold">
                    Tanlangan joy
                  </span>
                  <span className="text-[#E91E63] font-semibold text-lg">
                    {selectedPlace}
                  </span>
                </div>

                <div className="w-16 h-[1px] bg-[#F8D7E5] mx-auto"></div>

                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-xs uppercase tracking-wider text-[#888] font-semibold">
                    Tanlangan vaqt
                  </span>
                  <span className="text-[#E91E63] font-semibold text-lg">
                    {selectedTime}
                  </span>
                </div>
              </div>

              {/* Signature */}
              <p className="font-serif italic text-[#777] text-right text-base sm:text-lg mt-8">
                — Anvar
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

