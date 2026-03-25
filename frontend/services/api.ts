export const analyzeFile = async (file: File | Blob) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "http://localhost:5000/api/analyze-file",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze file");
  }

  return response.json();
};