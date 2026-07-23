import React from "react";
import {
  BookOpen,
  Download,
  Copy,
  Play,
  Sparkles,
  Check,
  Palette,
  FileText
} from "lucide-react";
import { ThemeMode } from "../types";

interface HeaderProps {
  currentTheme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  onExportPptx: () => void;
  onCopyAllText: () => void;
  onStartSlideshow: () => void;
  onOpenAIAssistant: () => void;
  copiedAll: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  setTheme,
  onExportPptx,
  onCopyAllText,
  onStartSlideshow,
  onOpenAIAssistant,
  copiedAll
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Title and Badges */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/30 border border-indigo-500/40 rounded-xl text-indigo-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-indigo-500/30">
                고등학교 국어
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-emerald-500/30">
                2022 개정 교육과정
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-amber-500/30">
                구글 슬라이드 5장 초안
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 mt-1 flex items-center gap-2">
              매체 리터러시와 가짜 뉴스 판별법
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Theme Selector */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-xs">
            <Palette className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
            <button
              onClick={() => setTheme("indigo")}
              className={`px-2 py-1 rounded transition-colors ${
                currentTheme === "indigo"
                  ? "bg-indigo-600 text-white font-medium"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              인디고
            </button>
            <button
              onClick={() => setTheme("neutral")}
              className={`px-2 py-1 rounded transition-colors ${
                currentTheme === "neutral"
                  ? "bg-slate-600 text-white font-medium"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              모던
            </button>
            <button
              onClick={() => setTheme("emerald")}
              className={`px-2 py-1 rounded transition-colors ${
                currentTheme === "emerald"
                  ? "bg-emerald-600 text-white font-medium"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              에메랄드
            </button>
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-sm active:scale-95 border border-purple-400/30"
            title="Gemini AI 교사 도우미"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            AI 교사 도우미
          </button>

          {/* Copy Text Button */}
          <button
            onClick={onCopyAllText}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
            title="구글 슬라이드로 복사하기 전체 줄글 텍스트"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                복사 완료!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                슬라이드 전체 텍스트 복사
              </>
            )}
          </button>

          {/* Standalone HTML Link */}
          <a
            href="/media_literacy_slides.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm"
            title="다운로드 후 더블클릭만으로 실행 가능한 단일 HTML 파일 열기"
          >
            <FileText className="w-3.5 h-3.5" />
            단일 HTML 파일 실행
          </a>

          {/* Export PPTX / Google Slides */}
          <button
            onClick={onExportPptx}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
            title="PPTX 다운로드 (구글 슬라이드에 직접 업로드 가능)"
          >
            <Download className="w-3.5 h-3.5" />
            PPTX 파일 다운로드
          </button>

          {/* Fullscreen Presentation */}
          <button
            onClick={onStartSlideshow}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
            title="수업용 전체화면 슬라이드 쇼"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            수업 발표 모드
          </button>
        </div>
      </div>
    </header>
  );
};
