const config = require("../config/aiConfig");

const ruleAI = require("./ruleBasedAI");
const llmAI = require("./llm-ai");

exports.generateInsights = async (findings) => {
  if (config.provider === "llm") {
    try {
      return await llmAI.generateInsights(findings);
    } catch (err) {
      console.log("LLM failed, falling back to rule-based");
      return ruleAI.generateInsights(findings);
    }
  }

  return ruleAI.generateInsights(findings);
};