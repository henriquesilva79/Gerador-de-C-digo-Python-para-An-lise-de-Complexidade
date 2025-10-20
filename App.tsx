
import React, { useState, useCallback } from 'react';
import { Complexity, GeneratedCode } from './types';
import { REQUIRED_SELECTIONS } from './constants';
import { generateAlgorithmCodes } from './services/geminiService';
import ComplexitySelector from './components/ComplexitySelector';
import CodeDisplay from './components/CodeDisplay';
import GithubGuide from './components/GithubGuide';

const App: React.FC = () => {
  const [selectedComplexities, setSelectedComplexities] = useState<Set<Complexity>>(new Set());
  const [generatedCodes, setGeneratedCodes] = useState<GeneratedCode[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleComplexity = useCallback((complexity: Complexity) => {
    setSelectedComplexities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(complexity)) {
        newSet.delete(complexity);
      } else {
        if (newSet.size < REQUIRED_SELECTIONS) {
          newSet.add(complexity);
        }
      }
      return newSet;
    });
  }, []);

  const handleGenerateCode = async () => {
    if (selectedComplexities.size !== REQUIRED_SELECTIONS) {
      setError(`Por favor, selecione exatamente ${REQUIRED_SELECTIONS} complexidades.`);
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedCodes(null);

    try {
      const complexitiesArray = Array.from(selectedComplexities);
      const result = await generateAlgorithmCodes(complexitiesArray);
      setGeneratedCodes(result);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-10">
            <div className="flex justify-center items-center gap-4 mb-4">
                 <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
                    Atividade Proposta
                </h1>
            </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gere 3 códigos Python, com testes e documentação, sobre complexidade de algoritmos.
          </p>
        </header>

        <ComplexitySelector
          selectedComplexities={selectedComplexities}
          onToggleComplexity={handleToggleComplexity}
        />

        <div className="mt-6 text-center">
          <button
            onClick={handleGenerateCode}
            disabled={isLoading || selectedComplexities.size !== REQUIRED_SELECTIONS}
            className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            {isLoading ? 'Gerando Códigos...' : 'Passo 2: Gerar Códigos'}
          </button>
        </div>

        {error && <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">Erro</p>
            <p>{error}</p>
        </div>}


        {isLoading && (
            <div className="mt-8 flex justify-center items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="text-gray-600">Aguarde, a IA está trabalhando...</p>
            </div>
        )}

        {generatedCodes && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
             <h2 className="text-xl font-bold text-gray-800 mb-4">Passo 3: Seus Códigos Gerados</h2>
            {generatedCodes.map((code, index) => (
              <div key={index} className="mb-8 border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-purple-700">{code.title}</h3>
                    <p className="text-sm font-semibold text-gray-500 bg-purple-100 inline-block px-2 py-1 rounded-full">{`Complexidade: ${code.complexity}`}</p>
                </div>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{code.explanation}</p>
                
                <CodeDisplay title={`Código Python: ${code.title.toLowerCase().replace(/\s+/g, '_')}.py`} code={code.python_code} />
                <CodeDisplay title={`Testes (Pytest): test_${code.title.toLowerCase().replace(/\s+/g, '_')}.py`} code={code.test_code} />
                <CodeDisplay title="Documentação: README.md" code={code.documentation} />
              </div>
            ))}
          </div>
        )}

        {generatedCodes && <GithubGuide />}
        
        <footer className="text-center mt-12 py-4 border-t">
            <p className="text-sm text-gray-500">
                Desenvolvido com React, Tailwind CSS e Gemini API.
            </p>
        </footer>

      </main>
    </div>
  );
};

export default App;
