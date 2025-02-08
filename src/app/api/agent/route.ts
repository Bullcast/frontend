import bullcastApi from '@/utils/bullcast';
import { createDataStreamResponse, DataStreamWriter } from 'ai';



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

    const response = {
        text: "Hello, how can I help you?",
        action: "none"
    }

    return createDataStreamResponse({
        execute: async (dataStream) => {
            // for (const message of messages) {
            //     dataStream.write({
            //         from,
            //         text: response.text,
            //         action: response.action,
            //     } as any);
            // }
            dataStream.writeData({
                text: response.text,
                action: response.action,
                value: "none"
            });
        },
        status: 200,
        statusText: 'OK',

    });

}