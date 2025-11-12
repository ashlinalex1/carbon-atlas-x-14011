import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateActionFromAlerts(alerts: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const alertSummary = alerts.map(a => 
      `- [${a.type.toUpperCase()} | ${a.severity}] ${a.title}: ${a.message}`
    ).join("\n");

    const prompt = `
    You are an environmental analytics assistant.
    Given these emission alerts from a sustainability dashboard:
    ${alertSummary}

    Analyze the situation and generate 3 specific recommended actions
    the organization can take to improve carbon efficiency.
    Keep the answer short and actionable.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini action generation error:", error);
    return "Unable to generate AI recommendations right now.";
  }
}
