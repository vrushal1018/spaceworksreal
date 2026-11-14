"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  title: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    src: "/Axis%20Electricals/Reception.png",
    title: "Reception & Lounge",
    alt: "Axis Electricals – Reception Desk and Waiting Lounge",
  },
  {
    src: "/Axis%20Electricals/Workspace%201.png",
    title: "Open Workstations",
    alt: "Axis Electricals – Open Plan Office Workstations",
  },
  {
    src: "/Axis%20Electricals/Axis%20Conference%20Room%202.png",
    title: "Conference Room",
    alt: "Axis Electricals – Finished Conference Room and Boardroom",
  },
  {
    src: "/Axis%20Electricals/Axis%20Conference%20Room%201.png",
    title: "Conference 3D Concept",
    alt: "Axis Electricals – Conference Room 3D Design Concept",
  },
];

export default function AxisSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Automatic slideshow transition every 4.4 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4400);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="work-slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Axis Electricals Photo Gallery"
      aria-roledescription="carousel"
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.src}
            className={`work-slideshow-slide ${isActive ? "active" : ""}`}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(min-width: 860px) 42vw, 100vw"
              priority={index < 2}
              className="work-slideshow-img"
            />
          </div>
        );
      })}

      <div className="work-slideshow-controls" aria-hidden="true">
        <button
          type="button"
          className="work-slideshow-btn"
          onClick={prevSlide}
          aria-label="Previous photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="work-slideshow-btn"
          onClick={nextSlide}
          aria-label="Next photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="work-slideshow-badge">
        <span>{SLIDES[current].title}</span>
        <span className="count">{`${String(current + 1).padStart(2, "0")} / ${String(SLIDES.length).padStart(2, "0")}`}</span>
      </div>

      <div className="work-slideshow-dots" role="tablist" aria-label="Slides">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`work-slideshow-dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to photo ${index + 1}: ${slide.title}`}
            aria-selected={index === current}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
}

