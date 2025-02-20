import { KeyValueSetting } from "../models/app-state.model";
import { ChatOpenAI } from "@langchain/openai";
import { DefaultLlmSetting } from "../models/settings.model";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Ollama } from "@langchain/community/llms/ollama";

const defaultOpenaiOptions = {
  temperature: 0.1,
  streaming: true,
};

export function getLLMModel(llmSetting: KeyValueSetting) {
  const apiKey = llmSetting.values["ApiKey"];
  const baseUrl = llmSetting.values["Url"];
  const modelName = llmSetting.values["Model"];
  const id: string | DefaultLlmSetting = llmSetting.id;
  let model;

  switch (id) {
    case "DEEPSEEK":
      model = new ChatOpenAI({
        ...defaultOpenaiOptions,

        configuration: {
          baseURL: baseUrl,
        },
        openAIApiKey: apiKey,
        verbose: false,
        model: modelName,
      });
      break;

      break;
    case "OPENAI":
      model = new ChatOpenAI({
        ...defaultOpenaiOptions,
        openAIApiKey: apiKey,
        verbose: false,
        model: modelName,
      });
      break;
    case "GOOGLE":
      model = new ChatGoogleGenerativeAI({
        ...defaultOpenaiOptions,
        model: modelName,
        apiKey,
      });
      break;
    case "OLLAMA":
      model = new Ollama({
        baseUrl: baseUrl,
        model: modelName,
      });
      break;
    default:
      throw new Error("Model not found");
  }

  return model;
}
