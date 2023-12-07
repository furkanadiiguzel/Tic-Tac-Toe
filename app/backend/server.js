// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import cors from 'cors'; // Import the cors middleware

dotenv.config();

// Initialize Express app
const app = express();
const port = 3001;

// Middleware

app.use(bodyParser.json());

app.use(cors()); // Enable CORS for all routes
// Initialize OpenAI

const openai = new OpenAI({
  apiKey: "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",
});

let threadId = null;

// Function to create a thread
async function createThread() {
  const thread = await openai.beta.threads.create();
  threadId = thread.id;
  console.log('Thread ID:', thread.id);
}

createThread();


// Function to communicate with GPT assistant and get the response
async function communicateWithGPT(message) {
  console.log('Communicating with GPT...');
  if (!threadId) {
    await createThread();
  }

  // Send user message to GPT
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: message,
  });

  // Run GPT
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: "asst_TB5XsLZb5FooIHAbgX9sUazq",
  });

  // Wait for run completion
  const runStatus = await waitForRunCompletion(threadId, run.id);

  // List messages
  const messages = await openai.beta.threads.messages.list(threadId);
  console.log(messages);

  // Find user's message in the messages array
  const userMessage = messages.data.find((msg) => msg.role === 'assistant');

  // Extract text from user's message content
  const userText = userMessage.content[0].text.value || '';

  return userText;
}

// Function to wait for GPT assistant run to complete
async function waitForRunCompletion(threadId, runId) {
  let run = await openai.beta.threads.runs.retrieve(threadId, runId);
  while (run.status !== 'completed') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await openai.beta.threads.runs.retrieve(threadId, runId);
  }
  return run;
}

app.post('/makeMove', async (req, res) => {
  const { board } = req.body;
  // Convert the board array to a formatted message for GPT assistant
  const message = JSON.stringify(board);
  // Communicate with GPT assistant and get the response
  const gptResponse = await communicateWithGPT(message);
  // Parse the GPT response and update the board
  const gptBoard = JSON.parse(gptResponse);
  // Respond with the GPT-assisted move
  res.json({ move: JSON.stringify(gptBoard) });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});