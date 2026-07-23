import React, { useState } from "react";
import { Sparkles, X, Send, Loader2, Copy, Check, MessageSquare } from "lucide-react";
import { Slide } from "../types";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: Slide;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  currentSlide
}) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/gemini/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          context: `현재 보고 있는 슬라이드: ${currentSlide.id}번 [${currentSlide.title}]\n줄글 본문: ${currentSlide.contentProse}\n성취기준: ${currentSlide.curriculumStandard}`
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gemini 응답을 받지 못했습니다.");
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetPrompts = [
    "논리적 오류 퀴즈를 하나 더 만들어줘 (다른 종류의 오류 적용)",
    "고등학생 수준에 맞는 쉬운 비유와 사례로 줄글 본문을 보강해줘",
    "교사가 수업 시간에 직접 말하듯 생생한 대화체 수업 대본을 써줘",
    "이 슬라이드 내용으로 모둠 활동 시 던질 수 있는 질문 3가지 추천해줘"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-400/30">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                Gemini AI 국어 교사 도우미
              </h3>
              <p className="text-xs text-purple-200">
                2022 개정 교육과정 기반 수업 자료 맞춤 생성 및 보강
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Context Banner */}
        <div className="bg-slate-100 px-5 py-2.5 border-b text-xs text-slate-600 flex items-center justify-between">
          <span>
            📌 대상: <strong className="text-indigo-900">{currentSlide.id}번 슬라이드 [{currentSlide.title}]</strong>
          </span>
          <span className="text-slate-400">Gemini 3.6 Flash</span>
        </div>

        {/* Modal Content / Results */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Preset Prompts Buttons */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-2">
              💡 자주 쓰는 교사 전용 프롬프트:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presetPrompts.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(preset);
                    handleSend(preset);
                  }}
                  className="text-left text-xs bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 p-2.5 rounded-lg text-slate-700 hover:text-purple-900 transition-all flex items-start gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>{preset}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result Output Area */}
          {loading && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center text-purple-900 space-y-2">
              <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold">Gemini AI가 수업 자료를 생성하고 있습니다...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-800">
              ⚠️ {error}
            </div>
          )}

          {result && !loading && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  AI 생성 결과물
                </span>
                <button
                  onClick={handleCopyResult}
                  className="flex items-center gap-1 text-xs bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg transition-colors font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      결과 복사
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto pr-1">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="예: 3번 슬라이드에 다른 논리적 오류 예시를 추가해줘..."
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !prompt.trim()}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            전송
          </button>
        </div>
      </div>
    </div>
  );
};
