

//controller foruploading resume -----------

import Resume from "../models/ResumeModel.js"

// POST:/api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt = "You are an expert AI agent to extract data from resume.";
    const userPrompt = `Extract data from this resume: ${resumeText}
    Provide data in the following json format with no additional text before or after:
    {
     professional_summary: { type: String, default: '' },
    skills: [{ type: String }],
    personal_info: {
        image: { type: String, default: '' },
        full_name: { type: String, default: '' },
        profession: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' }


    },
    experience: [
        {
            company: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean }

        }
    ],
    project: [
        {
            name: { type: String },
            type: { type: String },

            description: { type: String },
        }

    ],
    education:[
        {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String },
            gpa: { type: String },

        }
    ]

    }` ;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;

    let parsedData;
    try {
      parsedData = JSON.parse(extractedData);
    } catch (err) {
      return res.status(400).json({ message: "Failed to parse AI output", error: err.message });
    }

    const newResume = await Resume.create({ userId, title, ...parsedData });

    return res.json({ resume: newResume });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
