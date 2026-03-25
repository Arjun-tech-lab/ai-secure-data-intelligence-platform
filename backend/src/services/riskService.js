exports.calculateRisk = (findings) => {
  let score = 0;

  findings.forEach(f => {
    if (f.risk === "critical") score += 5;
    if (f.risk === "high") score += 3;
    if (f.risk === "medium") score += 2;
    if (f.risk === "low") score += 1;
  });

  let level = "low";
  if (score >= 7) level = "high";
  else if (score >= 4) level = "medium";

  return { score, level };
};