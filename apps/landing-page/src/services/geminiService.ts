import { GoogleGenAI } from "@google/genai";

const getClient = () => {
	const apiKey =
		process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
	if (!apiKey) {
		throw new Error("GEMINI_API_KEY is not defined in the environment");
	}
	return new GoogleGenAI({ apiKey });
};

export const generateSpicyHoroscope = async (
	sign: string,
	context: "daily" | "love" | "roast",
) => {
	try {
		const client = getClient();

		let prompt = "";

		if (context === "roast") {
			prompt = `Give me a brutally honest, funny, spicy, and slightly mean "roast" style horoscope for a ${sign}. 
        Keep it under 50 words. Do not be polite. Use Gen Z slang if appropriate but keep it witty. 
        Focus on their toxic traits.`;
		} else if (context === "love") {
			prompt = `Give me a spicy, steamy love horoscope for a ${sign}. 
        Keep it under 50 words. Focus on passion, mistakes, and attraction. Be direct and flirty.`;
		} else {
			prompt = `Give me a daily horoscope for a ${sign} that is sarcastic and funny. 
        Tell them what to avoid today. Keep it under 50 words.`;
		}

		const response = await client.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
			config: {
				temperature: 1.2, // High creativity/chaos
			},
		});

		return response.text;
	} catch (error) {
		console.error("Error generating horoscope:", error);
		return "The stars are ghosting us right now. Try again later, honey.";
	}
};
