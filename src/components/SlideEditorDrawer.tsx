import React, { useState, useEffect } from "react";
import { Slide } from "../types";
import { Save, X, RotateCcw, Check } from "lucide-react";

interface SlideEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slide: Slide;
  onSave: (updatedSlide: Slide) => void;
}

export const SlideEditorDrawer: React.FC<SlideEditorDrawerProps> = ({
  isOpen,
  onClose,
  slide,
  onSave
}) => {
  const [title, setTitle] = useState(slide.title);
  const [subtitle, setSubtitle] = useState(slide.subtitle);
  const [curriculumStandard, setCurriculumStandard] = useState(slide.curriculumStandard);
  const [contentProse, setContentProse] = useState(slide.contentProse);
  const [speakerNotes, setSpeakerNotes] = useState(slide.speakerNotes);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    setTitle(slide.title);
    setSubtitle(slide.subtitle);
    setCurriculumStandard(slide.curriculumStandard);
    setContentProse(slide.contentProse);
    setSpeakerNotes(slide.speakerNotes);
  }, [slide]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...slide,
      title,
      subtitle,
      curriculumStandard,
      contentProse,
      speakerNotes
    });

    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 animate-slideInRight">
        {/* Drawer Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-xs text-indigo-400 font-bold bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800">
              슬라이드 {slide.id} 직접 수정
            </span>
            <h3 className="text-base sm:text-lg font-bold mt-1">
              슬라이드 본문 및 대본 편집기
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Title input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">슬라이드 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Subtitle input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">부제목</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Curriculum standard */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">2022 개정 교육과정 성취기준</label>
            <input
              type="text"
              value={curriculumStandard}
              onChange={(e) => setCurriculumStandard(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Prose Content TextArea */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>상세 본문 (줄글 형태)</span>
              <span className="text-[10px] text-slate-400">줄바꿈을 사용하여 자유롭게 문단을 나눌 수 있습니다.</span>
            </label>
            <textarea
              rows={8}
              value={contentProse}
              onChange={(e) => setContentProse(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs sm:text-sm text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
            />
          </div>

          {/* Speaker Notes TextArea */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">교사 수업 진행 멘트 (발표자 노트)</label>
            <textarea
              rows={4}
              value={speakerNotes}
              onChange={(e) => setSpeakerNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
            />
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg transition-colors"
          >
            취소
          </button>

          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            {savedToast ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                저장되었습니다!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                변경 사항 저장
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
