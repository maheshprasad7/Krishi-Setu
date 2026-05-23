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

  let body: { imageBase64?: string; imageName?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { imageBase64, imageName } = body;
  if (!imageBase64) {
    return NextResponse.json({ error: "imageBase64 is required." }, { status: 400 });
  }

  const promptText = `You are an expert agricultural disease detection AI.

Analyze the uploaded crop image carefully.

Rules:
- First determine if the crop is HEALTHY or DISEASED.
- If no clear disease symptoms are visible, classify it as HEALTHY.
- Do NOT guess diseases unnecessarily.
- Only classify as diseased if visible symptoms strongly indicate disease.
- CRITICAL: Provide the 'remedy' and 'prevention' as clear bullet points.
- CRITICAL: Evaluate the severity of the disease and provide a 'severity' field with value "Low", "Medium", or "High".
- CRITICAL: In the 'remedy' field, PRIORITIZE and suggest ONLY ORGANIC, natural, or biological solutions.
- CRITICAL: Provide a separate 'chemicals' field where you explicitly mention the approximate local Indian market cost (in ₹) and the local availability of any recommended chemical pesticides or fertilizers, specifically in Mandya town, Karnataka (for a Mandya farmer).

Return ONLY valid JSON in this exact format. For all text fields, provide translations in both English ("en") and Kannada ("kn") inside an object:

{
  "status": "healthy or diseased",
  "severity": "Low",
  "disease": { "en": "Disease name or Healthy Crop", "kn": "ರೋಗದ ಹೆಸರು ಅಥವಾ ಆರೋಗ್ಯಕರ ಬೆಳೆ" },
  "confidence": 95,
  "symptoms": { "en": "Short explanation", "kn": "ಸಣ್ಣ ವಿವರಣೆ" },
  "remedy": { "en": "• Organic Point 1\\n• Organic Point 2", "kn": "• ಸಾವಯವ ಅಂಶ 1\\n• ಸಾವಯವ ಅಂಶ 2" },
  "chemicals": { "en": "• Chemical Point 1 (Est cost: ₹XXX in Mandya)", "kn": "• ರಾಸಾಯನಿಕ ಅಂಶ 1 (ಮಂಡ್ಯದಲ್ಲಿ ಅಂದಾಜು ಬೆಲೆ: ₹XXX)" },
  "prevention": { "en": "• Point 1", "kn": "• ಅಂಶ 1" }
}`;

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: imageBase64.split(",")[1] || imageBase64,
                },
              },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(30_000), // 30s timeout
    });

    if (geminiRes.status === 429) {
      return NextResponse.json(
        { error: "Gemini rate limit reached. Please try again in a moment." },
        { status: 429 }
      );
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("[/api/gemini/scan] Gemini error:", errText);
      return NextResponse.json(
        { error: `Gemini API error: ${geminiRes.status}` },
        { status: 502 }
      );
    }

    const json = await geminiRes.json();
    const txt = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleanTxt = txt.replace(/```json/gi, "").replace(/```/g, "").trim();

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleanTxt);
    } catch {
      console.error("[/api/gemini/scan] Failed to parse Gemini JSON:", cleanTxt);
      return NextResponse.json({ error: "Invalid JSON from Gemini." }, { status: 502 });
    }

    return NextResponse.json({ result: parsed });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("[/api/gemini/scan] Unexpected error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
