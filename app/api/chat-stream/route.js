import { encode } from "punycode";

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apikey: process.env.GEMINI_API_KEY,
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    const Stream = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      Stream: true,
    });

    const encoder = new TextEncoder();

    const reaadable = new ReadableStream({
      async start(controller) {
        for await (const chunk of Stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content })}`)
            );
          }
        }
        controller.close();
      },
    });

    return new Response(reaadable, {
      headers: {
        "content-Type": "text/event-stream",
        "Cache-Controll": "no-cache",
        Connection: "keep-alive",
      },   
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
