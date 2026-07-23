import React, { useState } from "react";
import { SlideQuiz } from "../types";
import { HelpCircle, CheckCircle2, XCircle, AlertTriangle, MessageSquare, RefreshCw, Lightbulb, ShieldAlert } from "lucide-react";

interface QuizCardProps {
  quiz: SlideQuiz;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelectOption = (id: string) => {
    setSelectedOptionId(id);
    setShowExplanation(true);
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setShowExplanation(false);
  };

  const selectedOption = quiz.options.find((opt) => opt.id === selectedOptionId);

  return (
    <div id="slide3-quiz-container" className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-orange-500/10 border-2 border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-lg text-slate-800 my-4">
      {/* Quiz Header Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-200/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            비판적 사고 퀴즈 (3번 슬라이드 핵심)
          </span>
          <span className="text-xs text-amber-800 font-semibold bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">
            논리적 오류 탐지 실습
          </span>
        </div>
        {selectedOptionId && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors border border-amber-300 font-medium"
          >
            <RefreshCw className="w-3 h-3" />
            다시 풀어보기
          </button>
        )}
      </div>

      {/* Question Title & Scenario */}
      <div className="space-y-3 mb-5">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <span>{quiz.questionTitle}</span>
        </h3>

        {/* Fake News Article Box */}
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-4 sm:p-5 text-slate-800 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-lg uppercase tracking-wider">
            가짜 뉴스 기사 예시
          </div>
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium text-slate-800 font-serif pt-1">
            {quiz.scenario}
          </p>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-2.5 mb-6">
        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          선택지를 클릭하여 정답을 확인하세요:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {quiz.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.isCorrect;

            let buttonStyle = "bg-white hover:bg-amber-50/80 border-slate-200 text-slate-800 hover:border-amber-300";
            if (isSelected) {
              buttonStyle = isCorrect
                ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-400"
                : "bg-red-50 border-red-400 text-red-900 font-semibold ring-2 ring-red-300";
            } else if (showExplanation && isCorrect) {
              buttonStyle = "bg-emerald-50/60 border-emerald-400 text-emerald-900 font-medium";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-2 shadow-sm ${buttonStyle}`}
              >
                <div className="flex items-start gap-2.5">
                  <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center shrink-0 text-xs ${
                    isSelected ? (isCorrect ? "bg-emerald-600 text-white" : "bg-red-500 text-white") : "bg-slate-100 text-slate-700"
                  }`}>
                    {opt.id}
                  </span>
                  <span className="pt-0.5 leading-snug">{opt.text}</span>
                </div>
                {isSelected && (
                  <span className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer Explanation & Logical Fallacies Analysis */}
      {showExplanation && selectedOption && (
        <div className="space-y-4 pt-2 animate-fadeIn">
          {/* Result Banner */}
          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            selectedOption.isCorrect
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-amber-50 border-amber-300 text-amber-900"
          }`}>
            {selectedOption.isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
            )}
            <div>
              <div className="font-bold text-sm sm:text-base">
                {selectedOption.isCorrect ? "정답입니다! 🎉" : "다시 검토해 봅시다!"}
              </div>
              <p className="text-xs sm:text-sm mt-0.5 leading-relaxed">
                {selectedOption.explanation}
              </p>
            </div>
          </div>

          {/* Detailed Logical Fallacies Breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 border-b pb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              기사 속 핵심 논리적 오류 심층 분석
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quiz.fallacyBreakdowns.map((fallacy, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1.5">
                  <div className="font-bold text-indigo-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {fallacy.name}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {fallacy.description}
                  </p>
                  <div className="bg-white p-2 rounded border border-slate-200 text-slate-600 italic">
                    {fallacy.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Prompt for High School Students */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs sm:text-sm text-indigo-950 flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-indigo-900 mb-1">
                🗣️ 모둠 탐구 및 학급 토의 질문
              </div>
              <p className="leading-relaxed text-indigo-800">
                {quiz.discussionPrompt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
