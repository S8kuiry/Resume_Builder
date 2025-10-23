import { BaggageClaimIcon, LucideShoppingBasket, Plus, ShoppingBag, ShoppingBagIcon, ShoppingBasket, ShoppingCartIcon, Sparkles, Trash, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

const ProfessionalExperience = ({ data, onChange }) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const MODEL = "gemini-2.5-flash";
  const [loading, setLoading] = useState(false);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const enhanceSummary = async (index, prompt) => {
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
Rewrite the user's job description of the job he did in past  to sound more professional and engaging.
Avoid robotic phrasing, avoid markdown symbols, and make it sound natural and first-person starting with "I".
DO NOT ASK ME OPTIONS AND GENERATE THE BEST YOU THINK AND avoid 
parts or statements like 'Here's an enhanced professional summary for Subharhy Kuiry, designed to be impressive, professional, and engaging:'
and dou use the name making it sound like a third person telling a summary always personalise and start with 'I'

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

      console.log("🔹 Response Status:", response.status);
      const dataRes = await response.json();
      console.log("🔍 Full Gemini API Response:", dataRes);

      if (dataRes.error) {
        console.error("❌ Gemini API Error:", dataRes.error);
        alert(`Gemini Error: ${dataRes.error.message || "Unknown error"}`);
        return;
      }

      const aiText =
        dataRes.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ AI could not generate an enhanced summary. Try again.";

      const cleanText = aiText
        .replace(/\*\*/g, "")
        .replace(/[*#`>_-]/g, "")
        .replace(/\n{2,}/g, "\n\n")
        .replace(/\s{2,}/g, " ")
        .trim();

      updateExperience(index, "description", cleanText);
    } catch (err) {
      console.error("🚨 AI enhance error (Network/Code):", err);
      alert("Something went wrong while enhancing your summary. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col mt-4 mb-2">

      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-900 flex items-center gap-2 ">
            Professional Experience
          </p>
          <p className="text-sm text-gray-500">Add your job experience</p>
        </div>
        <button
          onClick={addExperience}
          className="border border-transparent rounded cursor-pointer py-1 px-3 flex items-center gap-2 justify-center text-sm transition-colors duration-300 bg-green-300/30 text-green-500 hover:border-green-600"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length > 0? (<div className="w-full flex flex-col my-2">
        {data.map((itm,index) => (
          <div
            key={index}
            className="text-gray-900 my-3 w-full flex flex-col gap-4 rounded-lg border border-gray-400 py-4 px-4"
          >
            <div className="flex justify-between items-center ">
              <p className="font-medium">Experience #{index + 1}</p>
              <button
                onClick={() => removeExperience(index)}
                className="text-red-500 text-xs hover:underline"
              >
                <Trash2 className='size-4 cursor-pointer hover:scale-103' />
              </button>
            </div>
            {/*-------------------- compoany and position ------------------------ */}
            <div className="w-full flex items-center justify-between">
              <input
              required
                value={itm.company}
                onChange={(e) => updateExperience(index, "company", e.target.value)}
                placeholder="Company Name"
                className="text-sm w-[48%] border border-gray-400 rounded-lg py-3 px-2"
              />
              <input
              required
                value={itm.position}
                onChange={(e) => updateExperience(index, "position", e.target.value)}
                placeholder="Job Title"
                className="text-sm w-[48%] border border-gray-400 rounded-lg py-3 px-2"
              />
            </div>
            {/*------------------------- start and end date  ------------------------ */}
            <div className="w-full flex items-center justify-between">
              <input
                type="date"
                value={itm.start_date}
                onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                className="palceholder:text-gray-100 text-sm w-[48%] border border-gray-400 rounded-lg py-3 px-2"
              />
              <input
                type="date"
                value={itm.end_date}
                onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                className="palceholder:text-gray-100  text-sm w-[48%] border border-gray-400 rounded-lg py-3 px-2"
              />
            </div>
            {/*----------------- job description section ---------------------- */}
            <div className="w-full flex flex-col gap-1 mt-2">

              <label className="text-sm w-full flex items-center justify-start gap-2 my-2">
                <input
                  type="checkbox"
                  checked={itm.is_current}
                  onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                />
                <p className="text-gray-600">Currently working here</p>
              </label>

              <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <p className="font-regular flex items-center gap-2">
                    Job Description
                  </p>
                </div>

                <button
                  onClick={() => enhanceSummary(index, itm.description)}
                  disabled={loading}
                  className={`border border-transparent rounded cursor-pointer py-1 px-3 flex items-center gap-2 justify-center text-xs transition-colors duration-300 ${loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-300/30 text-purple-800 hover:border-purple-600"
                    }`}
                >
                  <Sparkles className="size-4" />
                  {loading ? "Enhancing..." : "Enhance with AI"}
                </button>
              </div>

              <textarea
                value={itm.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                className="outline-none focus:ring-1 focus:ring-blue-500 resize-none mt-4 mb-2 py-3 px-3 w-full rounded-lg border border-gray-400 h-44 text-sm placeholder:text-sm"
                placeholder="Write about your key responsibilities, projects, and achievements..."
              ></textarea>


            </div>
          </div>
        ))}
      </div>):(
         <div className="w-full flex flex-col items-center justify-center py-10 gap-2"
                >
                    <ShoppingCartIcon className='h-auto my-2 size-15 text-gray-300'/>
                    <p className='text-center text-sm text-gray-400'>No work experience added yet.<br></br>Click "Add Experience" to get started.</p>
                </div>
      )}
    </div>
  );
};

export default ProfessionalExperience;
