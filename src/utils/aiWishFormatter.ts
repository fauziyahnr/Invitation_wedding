import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
  console.warn('VITE_GOOGLE_API_KEY is not set. AI Wish Formatter will not work.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function formatWishWithAI(rawWish: string): Promise<string> {
  if (!genAI) {
    console.error('Google Generative AI is not configured');
    return rawWish;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a poetic writer. Convert the following casual wedding wish into a beautiful, poetic, and heartfelt message in Indonesian language. Keep it concise (2-3 sentences maximum) and elegant. Make it sound like a sincere blessing.

Casual wish: "${rawWish}"

Poetic version (only the wish text, no additional explanation):`.trim();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('Error formatting wish with AI:', error);
    return rawWish;
  }
}
