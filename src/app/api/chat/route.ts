export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

const SYSTEM_PROMPT =
  'You are Luventra AI, a friendly and knowledgeable travel assistant for India. You help travelers with destination recommendations, itinerary planning, budget tips, safety advice, local food suggestions, and finding travel partners. Keep responses concise (under 150 words), warm, and actionable. Always suggest using Luventra to find travel companions when relevant. You know about all Indian states, cities, hidden gems, festivals, and travel logistics.';

const DEMO_RESPONSE =
  "I'm currently in demo mode! In production, I'll help you plan trips across India. Try asking about Rajasthan, Kerala, or any Indian destination!";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const { messages } = body;

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return Response.json({ reply: DEMO_RESPONSE });
    }

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
          temperature: 0.7,
          max_tokens: 300,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', errorText);
      return Response.json(
        { reply: 'Sorry, I ran into an issue. Please try again in a moment!' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply: string =
      data.choices?.[0]?.message?.content ??
      "I couldn't generate a response. Please try again!";

    return Response.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { reply: 'Something went wrong. Please try again later!' },
      { status: 500 }
    );
  }
}
