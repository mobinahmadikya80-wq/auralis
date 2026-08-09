import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? items.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === items.length - 1 ? 0 : prevIdx + 1));
  };

  if (!items.length) return null;

  return (
    <div className={`relative group space-y-3 ${className}`}>
      {/* Slide Display Container */}
      <div className="relative overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, idx) => (
            <div key={idx} className="w-full shrink-0">
              {item}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-2xl bg-zinc-950/70 hover:bg-zinc-950 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-2xl bg-zinc-950/70 hover:bg-zinc-950 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {items.length > 1 && (
        <div className="flex justify-center items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-6 bg-cyan-500'
                  : 'w-2 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
