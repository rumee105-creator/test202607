import React, { useState } from "react";
import { Slide, ThemeMode } from "../types";
import { QuizCard } from "./QuizCard";
import {
  Copy,
  Check,
  Edit3,
  Bookmark,
  Sparkles,
  Layout,
  MessageCircle,
  FileText,
  ListOrdered
} from "lucide-react";

interface SlideViewerProps {
  slide: Slide;
  theme: ThemeMode;
  onEditClick: () => void;
  onOpenAIAssistant: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  slide,
  theme,
  onEditClick,
  onOpenAIAssistant
}) => {
  const [copiedSlide, setCopiedSlide] = useState(false);
  const [activeTab, setActiveTab] = useState<"prose" | "outline" | "notes">("prose");

  const getThemeClasses = () => {
    switch (theme) {
      case "indigo":
        return {
          bg: "bg-white",
          headerBg: "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white",
          badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
          accentColor: "text-indigo-600",
          borderAccent: "border-indigo-600",
          cardBg: "bg-indigo-50/50 border-indigo-100",
          buttonBg: "bg-indigo-600 hover:bg-indigo-700 text-white"
        };
      case "emerald":
        return {
          bg: "bg-white",
          headerBg: "bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white",
          badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          accentColor: "text-emerald-600",
          borderAccent: "border-emerald-600",
          cardBg: "bg-emerald-50/50 border-emerald-100",
          buttonBg: "bg-emerald-600 hover:bg-emerald-700 text-white"
        };
      case "neutral":
      default:
        return {
          bg: "bg-white",
          headerBg: "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white",
          badgeBg: "bg-slate-700/50 text-slate-300 border-slate-600",
          accentColor: "text-slate-800",
          borderAccent: "border-slate-800",
          cardBg: "bg-slate-100/70 border-slate-200",
          buttonBg: "bg-slate-800 hover:bg-slate-900 text-white"
        };
    }
  };

  const themeStyle = getThemeClasses();

  const handleCopySlideText = () => {
    const textToCopy = `[구글 슬라이드 ${slide.id}번]\n제목: ${slide.title}\n부제목: ${slide.subtitle}\n성취기준: ${slide.curriculumStandard}\n\n【본문 상세 내용 (줄글)】\n${slide.contentProse}\n\n【개요 포인트】\n${slide.bulletPoints.map((b) => `- ${b}`).join("\n")}\n\n【교사 수업 진행 멘트 (발표자 노트)】\n${slide.speakerNotes}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedSlide(true);
    setTimeout(() => setCopiedSlide(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 16:9 Slide Canvas Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all">
        {/* Slide Top Banner / Curriculum Achievement Standard */}
        <div className={`px-6 py-4 ${themeStyle.headerBg} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800`}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
              Slide {slide.id} / 5
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-medium border ${themeStyle.badgeBg}`}>
              {slide.curriculumStandard}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onEditClick}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors border border-white/20"
              title="슬라이드 본문 직접 수정"
            >
              <Edit3 className="w-3.5 h-3.5" />
              편집
            </button>
            <button
              onClick={handleCopySlideText}
              className="flex items-center gap-1.5 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              title="이 슬라이드 내용 복사 (구글 슬라이드에 붙여넣기용)"
            >
              {copiedSlide ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  이 슬라이드 복사
                </>
              )}
            </button>
          </div>
        </div>

        {/* Slide Main Header Area */}
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            {slide.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            {slide.subtitle}
          </p>
        </div>

        {/* View Mode Tabs (줄글 본문 vs 개요 요약) */}
        <div className="px-6 pt-4 bg-white border-b border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setActiveTab("prose")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === "prose"
                ? `${themeStyle.borderAccent} ${themeStyle.accentColor}`
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            줄글 상세 본문 (요청 양식)
          </button>
          <button
            onClick={() => setActiveTab("outline")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === "outline"
                ? `${themeStyle.borderAccent} ${themeStyle.accentColor}`
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            핵심 요약 개요
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === "notes"
                ? `${themeStyle.borderAccent} ${themeStyle.accentColor}`
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            교사 수업 멘트 & 레이아웃
          </button>
        </div>

        {/* Slide Body Content */}
        <div className="p-6 sm:p-8 space-y-6 min-h-[300px]">
          {activeTab === "prose" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Bookmark className="w-4 h-4 text-indigo-500" />
                슬라이드 본문 내용 (상세 줄글 작성)
              </div>

              {/* Detailed Prose Box */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm text-slate-800 leading-relaxed sm:leading-loose text-sm sm:text-base font-sans whitespace-pre-line border-l-4 border-l-indigo-600">
                {slide.contentProse}
              </div>

              {/* Slide 3 Quiz Section embedded directly */}
              {slide.quiz && <QuizCard quiz={slide.quiz} />}
            </div>
          )}

          {activeTab === "outline" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <ListOrdered className="w-4 h-4 text-indigo-500" />
                구글 슬라이드에 넣을 핵심 글머리 기호 개요
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slide.bulletPoints.map((point, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 shadow-sm hover:border-indigo-300 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-800 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Slide 3 Quiz Section in outline tab as well if present */}
              {slide.quiz && <QuizCard quiz={slide.quiz} />}
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-5 animate-fadeIn">
              {/* Speaker Notes Card */}
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <MessageCircle className="w-4 h-4 text-amber-600" />
                  교사 수업 진행 멘트 (구글 슬라이드 발표자 노트용)
                </div>
                <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line pl-6 border-l-2 border-amber-400">
                  {slide.speakerNotes}
                </p>
              </div>

              {/* Layout Advice Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <Layout className="w-4 h-4 text-indigo-600" />
                  구글 슬라이드 디자인 및 시각적 배치 제안
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-6 border-l-2 border-indigo-400">
                  {slide.layoutSuggestion}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info & AI Assistant prompt entry */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">💡 Tip:</span>
            <span>우측 상단의 복사/PPTX 버튼을 누르면 구글 슬라이드로 바로 내보내거나 붙여넣을 수 있습니다.</span>
          </div>

          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-bold bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors border border-indigo-200 self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI로 이 슬라이드 내용 보강하기
          </button>
        </div>
      </div>
    </div>
  );
};
