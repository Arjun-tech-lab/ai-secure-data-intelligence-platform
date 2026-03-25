exports.generateInsights = async (findings) => {
  const insights = [];

  findings.forEach(f => {
    if (f.type === "password")
      insights.push("Password detected - credentials exposure risk");

    if (f.type === "api_key")
      insights.push("API key exposed - unauthorized access risk");

    if (f.type === "stack_trace")
      insights.push("Stack trace leak - internal system info exposure");

    if (f.type === "email")
      insights.push("Email detected - sensitive user data");
  });

  return {
    summary: `Security risks detected. Total issues: ${findings.length}`,
    insights
  };
};