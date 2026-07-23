import React, { useState, useEffect } from "react";
import { Slide } from "../types";
import { QuizCard } from "./QuizCard";
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2, BookOpen } from "lucide-react";

interface FullscreenSlideshowProps {
  slides: Slide[];
  initialSlideIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const FullscreenSlideshow: React.FC<FullscreenSlideshowProps> = ({
  slides,
  initialSlideIndex,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);

  useEffect(() => {
    setCurrentIndex(initialSlideIndex);
  }, [initialSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowRight" || e.key === "Space") {
        if (currentIndex < slides.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, slides.length, onClose]);

  if (!isOpen) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden animate-fadeIn">
      {/* Top Controls Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-slate-200">
            [수업 발표 모드] 매체 리터러시와 가짜 뉴스 판별법
          </span>
          <span className="bg-indigo-900/80 text-indigo-300 text-xs px-2.5 py-0.5 rounded border border-indigo-700/50">
            {currentSlide.curriculumStandard}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-mono">
            {currentIndex + 1} / {slides.length}
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors shadow"
          >
            <X className="w-4 h-4" />
            닫기 (ESC)
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage (16:9 aspect) */}
      <div className="flex-1 p-4 sm:p-8 md:p-12 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-5xl bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 border border-slate-200 flex flex-col justify-between min-h-[500px]">
          {/* Header */}
          <div className="border-b pb-4 mb-6">
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              Slide {currentSlide.id}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Slide Content */}
          <div className="flex-1 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm text-sm sm:text-base md:text-lg leading-relaxed text-slate-800 whitespace-pre-line border-l-8 border-l-indigo-600 font-sans">
              {currentSlide.contentProse}
            </div>

            {/* Quiz if Slide 3 */}
            {currentSlide.quiz && <QuizCard quiz={currentSlide.quiz} />}
          </div>

          {/* Footer Speaker Note indicator in presentation mode */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>💡 2022 개정 고등학교 국어과 매체 리터러시 수업 자료</span>
            <span>키보드 방향키(← →) 또는 스페이스바로 이동할 수 있습니다.</span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Bar */}
      <div className="bg-slate-900/90 border-t border-slate-800 px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          이전 슬라이드
        </button>

        {/* Slide Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-indigo-500 w-8"
                  : "bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1))}
          disabled={currentIndex === slides.length - 1}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-colors shadow"
        >
          다음 슬라이드
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
