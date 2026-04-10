const OpenAI= require("openai");
require("dotenv").config(); 
//  Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


 const getJobRecommendations = async (skills, jobs) => {
    try {

        const jobList = jobs.map((job) => ({
            title: job.title,
            description: job.description,
            skills: job.description,
            location: job.location || "",
        }));

       const prompt = `
You are an AI job assistant.

User skills: ${skills}

// Available Jobs:
// ${JSON.stringify(jobList)}

Instructions:
- Match jobs based on skills relevance
- Give each job a match score (0% to 100%)
- Provide a short reason for the match
- Higher score = better match
- Return top 3 jobs
- Return ONLY JSON (no explanation)
- Sort jobs by matchScore (highest first)

Format:
[
  {
    "title": "Job Title 1",
    "matchScore": "90%",
    "reason": "Matches React and frontend skills"

  },
  {
    "title": "job Title 2",
    "matchScore": "85%",
        "reason": "Good match for backend and Node.js"

  },
  {
  "title": "Job Title 3",
  "matchScore": "85%",
  "reason": "Partial match based on JavaScript"

}
]
`;
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [{ role: "user", content: prompt }],
        });

       const result = response.choices[0].message.content;

        let parsed;

        try {
            parsed = JSON.parse(result);
        } catch {
            console.log("Invalid JSON from AI:", result);
            parsed = []
        }

        return parsed;

    } catch (error) {
        console.error("AI Error:", error.message);
        throw new Error("Failed to get AI recommendations");
    }
};

// const extractSkillsFromResume = async (resumeText) => {
//   try {
//     const prompt = `
// Extract skills from this resume text.

// Resume:
// ${resumeText}

// Instructions:
// - Return only skills as comma separated values
// - No explanation

// Example:
// JavaScript, React, Node.js
// `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//     });

//     return response.choices[0].message.content;

//   } catch (error) {
//     console.error("Skill Extraction Error:", error.message);
//     throw error;
//   }
// };



// Basic offline fallback for skill extraction


const extractSkillsFromText = async (text) => {
  const skillsList = [
    "JavaScript", "Node.js", "React", "MongoDB",
    "Express", "SQL", "Python", "Java", "C++", "JWT"
  ];

  try {
    const prompt = `Extract skills from this resume:\n${text}\nReturn as a JSON array of skill names.`;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    });

    const skillsText = response.choices[0].message.content;
    const skills = JSON.parse(skillsText);
    return skills;
  } catch (err) {
    console.warn("AI skill extraction failed, using fallback list");
    return skillsList.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));
  }
};

const getJobRecommendationsAI = async (skills, jobs,resumeText) => {
  try {
    const prompt = `
      You are a hiring assistant. 
      Candidate has skills: ${skills.join(", ")}.
      Resume text: ${resumeText}.
      Job descriptions: ${jobs.map((j,i)=>`${i+1}. ${j.title}: ${j.description}`).join("\n")}

      For each job, output JSON with:
      {
        "title": "...",
        "company": "...",
        "matchPercentage": number (0-100),
        "missingSkills": ["skill1", "skill2"],
        "atsScore": number (0-100)
      }
      Return a JSON array of job recommendations.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    });

    const jsonText = response.choices[0].message.content;
    const recommendations = JSON.parse(jsonText);

    return recommendations;

  } catch (err) {
    console.warn("AI recommendation failed, using fallback matching");

    return jobs.map(job => {
      const jobSkills = job.description.match(/\b(JavaScript|Node\.js|React|MongoDB|Express|SQL|Python|Java|C\+\+|JWT)\b/gi) || [];
      const matchedSkills = jobSkills.filter(js => skills.includes(js));
      const missingSkills = jobSkills.filter(js => !skills.includes(js));
      const matchPercentage = Math.round((matchedSkills.length / jobSkills.length) * 100 || 0);
      const atsScore = Math.round(matchPercentage * 0.9 + matchedSkills.length * 1.1);
      return {
        title: job.title,
        company: job.company,
        matchPercentage,
        missingSkills,
        atsScore
      };
    });
  }
};

module.exports = { extractSkillsFromText, getJobRecommendationsAI ,getJobRecommendations}
