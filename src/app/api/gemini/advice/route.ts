import { NextRequest, NextResponse } from "next/server";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key is not configured on the server." },
      { status: 500 }
    );
  }

  let body: { query?: string; lang?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { query, lang = "en" } = body;
  if (!query || typeof query !== "string") {
    return NextResponse.json({ error: "query string is required." }, { status: 400 });
  }

  const promptText = `You are Krishi-Setu, a warm, extremely polite, wise, and simple agricultural AI assistant designed to talk to rural farmers in Karnataka. Reply to the farmer's question in a simple, supportive, colloquial, farmer-friendly style. Keep your response short (maximum 3 sentences) so it can be easily read out loud to the farmer. The user asked in: "${lang}". Your reply MUST be 100% written in the language "${lang}" using its native script. Use very simple terms, no heavy scientific words. Question: "${query}"`;

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
      }),
      signal: AbortSignal.timeout(20_000), // 20s timeout
    });

    if (geminiRes.status === 429) {
      return NextResponse.json(
        { error: "Gemini rate limit reached. Please try again shortly." },
        { status: 429 }
      );
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("[/api/gemini/advice] Gemini error:", errText);
      return NextResponse.json(
        { error: `Gemini API error: ${geminiRes.status}` },
        { status: 502 }
      );
    }

    const json = await geminiRes.json();
    const replyText = json?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      return NextResponse.json({ error: "Empty response from Gemini." }, { status: 502 });
    }

    return NextResponse.json({ reply: replyText });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("[/api/gemini/advice] Unexpected error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
