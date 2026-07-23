import React, { useState } from "react";
import { initialSlides } from "./data/slideData";
import { Slide, ThemeMode } from "./types";
import { Header } from "./components/Header";
import { SlideViewer } from "./components/SlideViewer";
import { AIAssistantModal } from "./components/AIAssistantModal";
import { SlideEditorDrawer } from "./components/SlideEditorDrawer";
import { FullscreenSlideshow } from "./components/FullscreenSlideshow";
import { exportToPptx } from "./utils/pptxExport";
import {
  BookOpen,
  HelpCircle,
  Copy,
  Check,
  Download,
  Play,
  Sparkles,
  FileText,
  ChevronRight,
  GraduationCap,
  Info
} from "lucide-react";

export default function App() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [currentSlideId, setCurrentSlideId] = useState<number>(1);
  const [theme, setTheme] = useState<ThemeMode>("indigo");
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const activeSlide = slides.find((s) => s.id === currentSlideId) || slides[0];

  const handleSaveSlide = (updatedSlide: Slide) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === updatedSlide.id ? updatedSlide : s))
    );
  };

  const handleExportPptx = () => {
    exportToPptx(slides);
  };

  const handleCopyAllText = () => {
    const fullText = slides
      .map(
        (s) =>
          `==================================================\n[슬라이드 ${s.id}] ${s.title}\n부제목: ${s.subtitle}\n성취기준: ${s.curriculumStandard}\n\n【본문 상세 줄글 내용】\n${s.contentProse}\n\n${
            s.quiz
              ? `【3번 슬라이드 비판적 사고 퀴즈】\n질문: ${s.quiz.questionTitle}\n사례: ${s.quiz.scenario}\n\n선택지 및 정답:\n${s.quiz.options
                  .map((opt) => `${opt.id}. ${opt.text} ${opt.isCorrect ? "(정답)" : ""}`)
                  .join("\n")}\n\n논리적 오류 해설:\n${s.quiz.fallacyBreakdowns
                  .map((f) => `- ${f.name}: ${f.description}`)
                  .join("\n")}\n`
              : ""
          }【핵심 요약 개요】\n${s.bulletPoints.map((b) => `- ${b}`).join("\n")}\n\n【교사 수업 진행 멘트 (발표자 노트)】\n${s.speakerNotes}\n`
      )
      .join("\n\n");

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* Top Header Controls */}
      <Header
        currentTheme={theme}
        setTheme={setTheme}
        onExportPptx={handleExportPptx}
        onCopyAllText={handleCopyAllText}
        onStartSlideshow={() => setIsSlideshowOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        copiedAll={copiedAll}
      />

      {/* Main Classroom Workspace Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: 5 Slides List */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>5장 슬라이드 목록</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                총 5개 슬라이드
              </span>
            </div>

            {/* Slide Navigation List */}
            <div className="space-y-2">
              {slides.map((s) => {
                const isActive = s.id === currentSlideId;
                const isQuizSlide = s.id === 3;

                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideId(s.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 relative ${
                      isActive
                        ? "bg-indigo-50/80 border-indigo-500 shadow-sm ring-1 ring-indigo-400"
                        : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {/* Slide Number Badge */}
                    <div
                      className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : isQuizSlide
                          ? "bg-amber-500 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {s.id}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {s.title}
                        </span>
                        {isQuizSlide && (
                          <span className="bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded flex items-center gap-0.5 shadow-xs">
                            <HelpCircle className="w-2.5 h-2.5" />
                            퀴즈 포함
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {s.subtitle}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-2 transition-transform ${
                        isActive ? "text-indigo-600 translate-x-0.5" : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Teacher Quick Helper Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white rounded-2xl p-5 border border-indigo-800 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 border border-indigo-500/30">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-indigo-200">
                2022 개정 교육과정 매체 리터러시
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              본 수업안은 2022 개정 국어과 교육과정의 매체 영역 성취기준([10국04-02], [12매체01-02])을 반영하여 제작되었습니다.
            </p>
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={handleCopyAllText}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                구글 슬라이드 전체 줄글 텍스트 복사
              </button>
              <button
                onClick={handleExportPptx}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                구글 슬라이드용 .PPTX 파일 생성
              </button>
            </div>
          </div>
        </aside>

        {/* Right Main Stage: Active Slide Viewer */}
        <section className="lg:col-span-8">
          <SlideViewer
            slide={activeSlide}
            theme={theme}
            onEditClick={() => setIsEditorOpen(true)}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        </section>
      </main>

      {/* Modals & Drawers */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        currentSlide={activeSlide}
      />

      <SlideEditorDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        slide={activeSlide}
        onSave={handleSaveSlide}
      />

      <FullscreenSlideshow
        slides={slides}
        initialSlideIndex={currentSlideId - 1}
        isOpen={isSlideshowOpen}
        onClose={() => setIsSlideshowOpen(false)}
      />
    </div>
  );
}
