export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("Received message:", message);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    const data = await response.json();
    console.log("API Response:", data);

    if (!response.ok) {
      console.error("API Error:", data);
      return Response.json(
        { error: data.error || "API request failed" },
        { status: response.status }
      );
    }

    return Response.json({
      response: data.choices?.[0]?.message?.content || "No response",
    });
  } catch (error) {
    console.error("Server Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
