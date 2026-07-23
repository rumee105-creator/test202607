import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY가 설정되지 않았습니다.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Teacher Helper API endpoint
app.post("/api/gemini/assist", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "프롬프트 내용이 필요합니다." });
    }

    const ai = getGeminiClient();
    const systemInstruction = `당신은 대한민국 고등학교 국어 교사이자 2022 개정 교육과정에 숙달된 매체 리터러시 교육 전문가입니다.
사용자(선생님)의 요청에 따라 '매체 리터러시와 가짜 뉴스 판별법' 수업 슬라이드 초안, 추가 논리적 오류 퀴즈, 교사 수업 진행 대본(발표자 노트), 학생 맞춤형 질문 등을 친절하고 전문적인 어조로 한국어로 작성해 주세요.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `${context ? `[수업 맥락 정보]\n${context}\n\n` : ""}[요청 사항]\n${prompt}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "AI 도우미 응답 생성 중 오류가 발생했습니다.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
