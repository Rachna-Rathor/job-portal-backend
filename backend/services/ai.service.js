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
console.log("Job List:", jobList);

        const prompt = `
You are an AI job assistant.

User skills: ${skills}

Available Jobs:
${JSON.stringify(jobList)}

Instructions:
- Match jobs based on skills relevance
- Prioritize exact skill matches
- Ignore irrelevant jobs
- Return ONLY valid JSON (no explanation)

Format:
[
  { "title": "Job Title 1" },
  { "title": "Job Title 2" },
  { "title": "Job Title 3" }
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
            parsed = result;
        }

        return parsed;

    } catch (error) {
        console.error("AI Error:", error.message);
        throw new Error("Failed to get AI recommendations");
    }
};
module.exports = { getJobRecommendations };