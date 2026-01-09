import configuration from '@/config/configuration';
import { systemPromptText } from '@/constant/systemPromptText';
import { TMessage } from '@/types/chatMessage';
import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// * 0 Initialize gemini ai
const ai = new GoogleGenAI({ apiKey: configuration.geminiAPIKey });

export async function POST(req: NextRequest) {
  const { history } = await req.json();

  // * 1 Build chat session with dynamic history (including system prompt)
  const systemPrompt = {
    parts: [{ text: systemPromptText }],
    role: 'model',
  };

  // * 2 Map user history to Gemini parts
  const geminiHistory = [
    systemPrompt,
    ...history.map((msg: TMessage) => ({
      parts: [{ text: msg.text }],
      role: msg.role === 'user' ? 'user' : 'model',
    })),
  ];

  // * 3 Create chat with full history
  const chat = await ai.chats.create({
    model: 'gemini-2.0-flash',
    config: { temperature: 0.6, maxOutputTokens: 1024 },
    history: geminiHistory,
  });

  // * 4 Send last message and get response
  const last = history[history.length - 1];
  const resp = await chat.sendMessage({ message: last.text });

  // ‣ each `resp` has a `candidates` array; take the first candidate
  const content = resp.candidates?.[0]?.content;
  // * 5 pull out the text from the first part
  const answer =
    content?.parts?.[0]?.text ?? "Sorry, I couldn't generate an answer.";

  // * 6 return it
  return NextResponse.json({ answer });
}
