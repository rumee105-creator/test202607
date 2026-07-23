import pptxgen from "pptxgenjs";
import { Slide } from "../types";

export const exportToPptx = (slides: Slide[]) => {
  const pres = new pptxgen();

  pres.layout = "LAYOUT_16x9";
  pres.author = "고등학교 국어 교사";
  pres.company = "2022 개정 국어과 교육과정";
  pres.title = "매체 리터러시와 가짜 뉴스 판별법";

  slides.forEach((slide) => {
    const pptSlide = pres.addSlide();

    // Slide Background
    pptSlide.background = { color: "F8FAFC" };

    // Top Banner / Header Category
    pptSlide.addText(slide.curriculumStandard, {
      x: 0.6,
      y: 0.4,
      w: 12.13,
      h: 0.4,
      fontSize: 11,
      color: "2563EB",
      bold: true,
    });

    // Slide Main Title
    pptSlide.addText(slide.title, {
      x: 0.6,
      y: 0.8,
      w: 12.13,
      h: 0.7,
      fontSize: 22,
      color: "0F172A",
      bold: true,
    });

    // Subtitle
    pptSlide.addText(slide.subtitle, {
      x: 0.6,
      y: 1.45,
      w: 12.13,
      h: 0.4,
      fontSize: 13,
      color: "64748B",
    });

    // Main Prose Box (Left Column or Top Box)
    pptSlide.addText("【 본문 상세 설명 (줄글 형태) 】", {
      x: 0.6,
      y: 2.0,
      w: 6.0,
      h: 0.35,
      fontSize: 12,
      color: "1E293B",
      bold: true,
    });

    pptSlide.addText(slide.contentProse, {
      x: 0.6,
      y: 2.4,
      w: 6.0,
      h: 4.2,
      fontSize: 12,
      color: "334155",
      lineSpacing: 18,
      rectRadius: 0.1,
      fill: { color: "FFFFFF" },
      line: { color: "E2E8F0", width: 1 },
      margin: [12, 12, 12, 12],
    });

    // Right Column (Bullet points / Quiz)
    if (slide.quiz) {
      // Quiz Section
      pptSlide.addText("【 비판적 사고 퀴즈 (3번 슬라이드) 】", {
        x: 6.9,
        y: 2.0,
        w: 5.8,
        h: 0.35,
        fontSize: 12,
        color: "D97706",
        bold: true,
      });

      pptSlide.addText(`${slide.quiz.questionTitle}\n\n${slide.quiz.scenario}`, {
        x: 6.9,
        y: 2.4,
        w: 5.8,
        h: 2.2,
        fontSize: 11,
        color: "1E293B",
        fill: { color: "FEF3C7" },
        line: { color: "FCD34D", width: 1 },
        margin: [10, 10, 10, 10],
      });

      const optionsText = slide.quiz.options
        .map((opt) => `${opt.id}. ${opt.text} ${opt.isCorrect ? " (정답!)" : ""}`)
        .join("\n");

      pptSlide.addText(`[선택지 및 해설]\n${optionsText}`, {
        x: 6.9,
        y: 4.7,
        w: 5.8,
        h: 1.9,
        fontSize: 10,
        color: "0F172A",
        fill: { color: "FFFFFF" },
        line: { color: "E2E8F0", width: 1 },
        margin: [8, 8, 8, 8],
      });
    } else {
      // Key Outline Points
      pptSlide.addText("【 핵심 요약 개요 】", {
        x: 6.9,
        y: 2.0,
        w: 5.8,
        h: 0.35,
        fontSize: 12,
        color: "1E293B",
        bold: true,
      });

      const bulletText = slide.bulletPoints.map((bp) => `• ${bp}`).join("\n\n");
      pptSlide.addText(bulletText, {
        x: 6.9,
        y: 2.4,
        w: 5.8,
        h: 2.2,
        fontSize: 11,
        color: "334155",
        fill: { color: "F1F5F9" },
        line: { color: "CBD5E1", width: 1 },
        margin: [12, 12, 12, 12],
      });

      // Teacher Notes
      pptSlide.addText("【 교사 수업 진행 멘트 (발표자 노트) 】", {
        x: 6.9,
        y: 4.75,
        w: 5.8,
        h: 0.3,
        fontSize: 11,
        color: "475569",
        bold: true,
      });

      pptSlide.addText(slide.speakerNotes, {
        x: 6.9,
        y: 5.1,
        w: 5.8,
        h: 1.5,
        fontSize: 10,
        color: "475569",
        fill: { color: "EFF6FF" },
        line: { color: "BFDBFE", width: 1 },
        margin: [8, 8, 8, 8],
      });
    }

    // Add Speaker Notes to PPTX native notes panel as well
    pptSlide.addNotes(`[2022 개정 국어과 지도안 노트]\n${slide.speakerNotes}\n\n[디자인 레이아웃 제안]: ${slide.layoutSuggestion}`);
  });

  pres.writeFile({ fileName: "매체리터러시_가짜뉴스판별법_수업슬라이드.pptx" });
};
