const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.generateInsights = async (findings) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const prompt = `Analyze security risks:
${JSON.stringify(findings, null, 2)}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      summary: "AI-generated security analysis",
      insights: [text]
    };

  } catch (error) {
    throw error;
  }
};