import { Sparkles } from "lucide-react";
import React, { useState } from "react";

const ProfessionalSummary = ({ data, onChange, setResumeData }) => {
  const [summary, setSummary] = useState(data || "");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const MODEL = "gemini-2.5-flash";

  const enhanceSummary = async (prompt) => {
    if (!prompt.trim()) {
      alert("Please enter your current professional summary first!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `

Enhance the user's professional summary to make it more impressive, professional, and engaging,
while keeping the original tone and intent.DO NOT ASK ME OPTIONS AND GENERATE THE BEST YOU THINK AND avoid 
parts or statements like 'Here's an enhanced professional summary for Subharhy Kuiry, designed to be impressive, professional, and engaging:'
and don't use the name making it sound like a third person telling a summary ,always personalise and start with 'I'

User Summary:
${prompt}
                  `,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 3000,
            },
          }),
        }
      );

      // ✅ Log the raw HTTP status and body
      console.log("🔹 Response Status:", response.status);

      const data = await response.json();
      console.log("🔍 Full Gemini API Response:", data);

      // ✅ Handle cases where Gemini returns an error object
      if (data.error) {
        console.error("❌ Gemini API Error:", data.error);
        alert(`Gemini Error: ${data.error.message || "Unknown error"}`);
        return;
      }

      const aiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ AI could not generate an enhanced summary. Try again.";

      setSummary(aiText.replace(/\*\*/g, "")             // remove **bold** markdown
        .replace(/[*#`>_-]/g, "")         // remove other markdown symbols
        .replace(/\n{2,}/g, "\n\n")       // normalize double newlines
        .replace(/\s{2,}/g, " ")          // collapse multiple spaces
        .trim());
      setResumeData((prev) => ({
        ...prev,
        professional_summary: aiText.replace(/\*\*/g, "")             // remove **bold** markdown
          .replace(/[*#`>_-]/g, "")         // remove other markdown symbols
          .replace(/\n{2,}/g, "\n\n")       // normalize double newlines
          .replace(/\s{2,}/g, " ")          // collapse multiple spaces
          .trim(),
      }));
    } catch (err) {
      console.error("🚨 AI enhance error (Network/Code):", err);
      alert("Something went wrong while enhancing your summary. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col mt-4 mb-2">
      <div className="w-full flex flex-row items-center justify-between mb-6">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            Professional Summary
          </p>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>

        <button
          onClick={() => enhanceSummary(summary)} // ✅ fixed
          disabled={loading}
          className={`border border-transparent rounded cursor-pointer py-1 px-3 flex items-center gap-2 justify-center 
          text-sm transition-colors duration-300 ${loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-300/30 text-purple-800 hover:border-purple-600"
            }`}
        >
          <Sparkles className="size-4" />
          {loading ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <textarea
        onChange={(e) => {
          setResumeData((prev) => ({
            ...prev,
            professional_summary: e.target.value,
          }));
          setSummary(e.target.value);
        }}
        value={summary}
        className="text-gray-900 mt-4 mb-2 outline-none focus:ring-1 focus:ring-blue-500 resize-none mt-4 mb-2 py-3 px-3 w-full rounded-lg border border-gray-400 h-44 text-sm placeholder:text-sm"
        placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
      ></textarea>

      <p className="mb-4 w-full text-center text-xs text-gray-400">
        Tip: Keep it concise (3-4 sentences) and focus on your most
        <br />
        relevant achievements and skills.
      </p>


    </div>
  );
};

export default ProfessionalSummary;
