import { streamText } from 'ai';

import { createOpenAI as createGroq } from '@ai-sdk/openai';

const groq = createGroq({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });

export function errorHandler(error: unknown) {
    if (error == null) {
        return 'unknown error';
    }

    if (typeof error === 'string') {
        return error;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return JSON.stringify(error);
}

export async function POST(req: Request) {
    const { messages } = await req.json();


    const result = streamText({
        model: groq('llama-3.3-70b-versatile'),
        system: 'You are a helpful assistant.',
        messages,
      });
    

    return result.toDataStreamResponse({
        getErrorMessage: errorHandler,
    });
}