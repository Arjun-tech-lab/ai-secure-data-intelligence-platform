const patterns = {
  email: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  password: /password\s*=\s*\S+/i,
  api_key: /api[_-]?key\s*=\s*\S+/i,
  stack_trace: /(Exception|Error|stack trace)/i,
  phone: /\b\d{10}\b/,
  token: /token\s*=\s*\S+/i
};

exports.detect = (text) => {
  const findings = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    Object.keys(patterns).forEach(type => {
      if (patterns[type].test(line)) {
        findings.push({
          type,
          risk: getRisk(type),
          line: index + 1
        });
      }
    });
  });

  return findings;
};

function getRisk(type) {
  const riskMap = {
    email: "low",
    phone: "low",
    password: "critical",
    api_key: "high",
    token: "high",
    stack_trace: "medium"
  };
  return riskMap[type] || "low";
}