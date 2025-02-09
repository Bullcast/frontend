import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { messages, wallet } = await req.json();

    if (!messages || !messages.length) {
        return NextResponse.error();
    }   
    
    const apiUrl = process.env.AGENT_API_URL;

    if (!apiUrl) {
        return NextResponse.error();
    }
    
    const result = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: messages[messages.length - 1].content,
            from: wallet,
        }),
    }).then((res) => res.json());
    

    return NextResponse.json(result.map((item: any) => ({
        content: item.text,
        role: 'assistant',
        ptb: item.payload
    })));
}