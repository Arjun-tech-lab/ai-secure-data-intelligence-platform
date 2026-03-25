const detectionService = require('../services/detectionService');
const riskService = require('../services/riskService');
const aiService = require('../services/aiService');

exports.analyzeInput = async (req, res) => {
  try {
    const { content } = req.body;

    const findings = detectionService.detect(content);
    const risk = riskService.calculateRisk(findings);
    const aiInsights = await aiService.generateInsights(findings);

    res.json({
      summary: aiInsights.summary,
      findings,
      risk_score: risk.score,
      risk_level: risk.level,
      insights: aiInsights.insights
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.analyzeFile = async (req, res) => {
  try {
    const fileContent = req.file.buffer.toString();

    const findings = detectionService.detect(fileContent);
    const risk = riskService.calculateRisk(findings);
    const aiInsights = await aiService.generateInsights(findings);

    res.json({
      summary: aiInsights.summary,
      findings,
      risk_score: risk.score,
      risk_level: risk.level,
      insights: aiInsights.insights
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};