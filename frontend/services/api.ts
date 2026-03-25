const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const analyzeFile = async (file: File | Blob) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_URL}/api/analyze-file`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
};