import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_HOST = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NGROK_HOST;

export async function POST(request) {
    if (!process.env.REPLICATE_API_TOKEN) {
        throw new Error(
            'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
        );
    }

    const { prompt } = await request.json();

    const options = {
        model: 'ibm-granite/granite-3.3-8b-instruct',
        input: {
            prompt: prompt,
            max_tokens: 512,
            temperature: 0.75,
            top_p: 1,
            // Anda bisa menyesuaikan parameter lain sesuai kebutuhan
        }
    };

    if (WEBHOOK_HOST) {
        options.webhook = `${WEBHOOK_HOST}/api/webhooks`;
        options.webhook_events_filter = ["start", "completed"];
    }

    const prediction = await replicate.predictions.create(options);

    if (prediction?.error) {
        return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction, { status: 201 });
}