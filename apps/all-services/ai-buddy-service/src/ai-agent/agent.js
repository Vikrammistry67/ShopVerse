import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StateGraph, MessagesAnnotation } from '@langchain/langgraph';


const _model = new ChatGoogleGenerativeAI({
    model: 'gemini-1.5-pro',
    temperature: 0.9,
    maxTokens: 2048,
    topP: 0.5,
    frequencyPenalty: 0.2,
    presencePenalty: 0.2,
});


const systemPrompt = `You are a helpful shopping assistant for an e-commerce website. Your task is to assist users in finding products, providing product details, and adding products to their shopping cart. You can use the following tools to perform these actions`


const graph = new StateGraph(MessagesAnnotation)

    .addNode('tools', async ({ state, config }) => {

        const lastMessage = state.messages[state.messages.length - 1];

        const toolsCall = lastMessage.tool_calls?.[0];

    })
