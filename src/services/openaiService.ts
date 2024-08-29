import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeEmailContent = async (emailContent: string): Promise<string> => {
    console.log('Analyzing email content:', emailContent);
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Analyze the following email content and strictly categorize it as: Interested, Not Interested, or More Information.\n\n${emailContent}` }
        ],
        max_tokens: 50,
    });

    const category = response.choices[0]?.message?.content?.trim().toLowerCase();
    if (category?.includes("interested")) return "Interested";
    if (category?.includes("not interested")) return "Not Interested";
    if (category?.includes("more information")) return "More Information";
    return 'More Information'; 
};

export const categorizeEmail = async (emailContent: string): Promise<string> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an assistant that only categorizes emails into: Interested, Not Interested, or More Information." },
                { role: "user", content: `Categorize the following email as Interested, Not Interested, or More Information:\n\n"${emailContent}"` }
            ],
            max_tokens: 10,
        });

        const category = response.choices[0]?.message?.content?.trim().toLowerCase();
        if (category?.includes("interested")) return "Interested";
        if (category?.includes("not interested")) return "Not Interested";
        if (category?.includes("more information")) return "More Information";
        console.log(`Email categorized as: ${category}`);
        return 'More Information'; 
    } catch (error) {
        console.error('Error categorizing email:', error);
        throw error;
    }
};
export const generateEmailResponse = async (category: string): Promise<string> => {
    try {
        const prompt = `Generate a professional email response for the category: ${category}. Start with "Dear Recipient" and make sure the response is concise, friendly, and contains no placeholders like [Name], [Position], or [Contact Information].`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an assistant generating professional email responses without placeholders." },
                { role: "user", content: prompt }
            ],
            max_tokens: 150,
        });
        const emailResponse = response.choices[0]?.message?.content?.replace(/\[.*?\]/g, '').trim() || '';
        console.log(`Generated response: ${emailResponse}`);
        return emailResponse;
    } catch (error) {
        console.error('Error generating email response:', error);
        throw error;
    }
};
