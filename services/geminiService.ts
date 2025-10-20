
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedCode } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      complexity: {
        type: Type.STRING,
        description: 'A notação Big O, por exemplo: O(n), O(log n), etc.',
      },
      title: {
        type: Type.STRING,
        description: 'Um título para o algoritmo, por exemplo: "Soma de Elementos de uma Lista".',
      },
      explanation: {
        type: Type.STRING,
        description: 'Uma explicação clara sobre o algoritmo, sua complexidade de tempo e um caso de uso.',
      },
      python_code: {
        type: Type.STRING,
        description: 'O código fonte completo em Python da função, com type hints e comentários. Deve ser um bloco de código pronto para ser salvo em um arquivo .py.',
      },
      test_code: {
        type: Type.STRING,
        description: 'O código de teste completo usando pytest, pronto para ser salvo em um arquivo, por exemplo: test_soma_lista.py.',
      },
      documentation: {
        type: Type.STRING,
        description: 'Conteúdo em formato Markdown para um arquivo README.md, explicando o algoritmo, como executar o código e os testes.',
      },
    },
    required: ['complexity', 'title', 'explanation', 'python_code', 'test_code', 'documentation']
  },
};

export const generateAlgorithmCodes = async (complexities: string[]): Promise<GeneratedCode[]> => {
  const prompt = `
    Você é um especialista em algoritmos e Python. Sua tarefa é gerar 3 exemplos de código Python que demonstram princípios de complexidade de algoritmos, com base nas complexidades solicitadas.

    Para cada uma das seguintes complexidades: ${complexities.join(', ')}

    Gere o seguinte:
    1.  Um título descritivo para o algoritmo (ex: "Busca Binária").
    2.  Uma breve explicação do algoritmo, por que ele tem a complexidade de tempo especificada e um exemplo de caso de uso.
    3.  O código Python completo para a função, com type hints e comentários explicativos. O nome da função deve ser em snake_case e relacionado ao que ela faz.
    4.  Um código de teste completo para a função usando o framework \`pytest\`. O arquivo de teste deve ser nomeado seguindo o padrão 'test_nome_da_funcao.py'.
    5.  Uma seção de documentação em formato Markdown para um arquivo \`README.md\`, explicando como executar o código e os testes.

    Retorne sua resposta como um objeto JSON. Não inclua \`\`\`json no início ou \`\`\` no final.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);

    // Basic validation to ensure the result matches the expected structure
    if (Array.isArray(parsedResult) && parsedResult.every(item => 'complexity' in item && 'python_code' in item)) {
        return parsedResult as GeneratedCode[];
    } else {
        throw new Error("A resposta da API não corresponde ao formato esperado.");
    }
    
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw new Error("Não foi possível gerar os códigos. Verifique o console para mais detalhes.");
  }
};
