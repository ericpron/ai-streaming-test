import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request) {
  const { messages } = await request.json();

  // createChatCompletion (get response from gpt4)
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a friendly and helpful chatbot who just wants to make friends",
      },
      ...messages,
    ],
  });

  // create a stream of data from the response
  const stream = await OpenAIStream(response);

  // send the stream as a response to the ui
  return new StreamingTextResponse(stream);
}
