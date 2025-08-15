// app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }

    // Recommended Groq model
    const model = "llama-3.3-70b-versatile";
    // Alternative: const model = "mistral-saba-24b";

    const completion = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: body.messages,
        temperature: 0.7,
      }),
    });

    // If Groq API fails
    if (!completion.ok) {
      const errText = await completion.text();
      return NextResponse.json(
        { error: `Groq API Error (${completion.status}): ${errText}` },
        { status: completion.status }
      );
    }

    const data = await completion.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: "Failed to fetch from Groq API" }, { status: 500 });
  }
}
