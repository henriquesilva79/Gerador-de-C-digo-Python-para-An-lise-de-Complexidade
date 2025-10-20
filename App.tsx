import React, { useState, useCallback } from 'react';
import { Complexity, GeneratedCode } from './types';
import { REQUIRED_SELECTIONS } from './constants';
import { generateAlgorithmCodes } from './services/geminiService';
import ComplexitySelector from './components/ComplexitySelector';
import GithubGuide from './components/GithubGuide';
import GeneratedCodeItem from './components/GeneratedCodeItem';

const App: React.FC = () => {
  const [selectedComplexities, setSelectedComplexities] = useState<Set<Complexity>>(new Set());
  const [generatedCodes, setGeneratedCodes] = useState<GeneratedCode[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

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
  
  const handleToggleAccordion = useCallback((index: number) => {
    setOpenAccordionIndex(prevIndex => (prevIndex === index ? null : index));
  }, []);

  const handleGenerateCode = async () => {
    if (selectedComplexities.size !== REQUIRED_SELECTIONS) {
      setError(`Por favor, selecione exatamente ${REQUIRED_SELECTIONS} complexidades.`);
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedCodes(null);
    setOpenAccordionIndex(null);

    try {
      const complexitiesArray = Array.from(selectedComplexities);
      const result = await generateAlgorithmCodes(complexitiesArray);
      setGeneratedCodes(result);
      setOpenAccordionIndex(0); // Open the first item by default
    } catch (err: any)
      {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-900">
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-12">
            <div className="inline-block bg-white p-4 rounded-full shadow-md mb-4">
                 <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
                Gerador de Código Python
            </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
            Gere exemplos completos de algoritmos com código, testes e docs usando o poder da IA.
          </p>
        </header>

        <section id="step1" className="mb-8">
            <ComplexitySelector
              selectedComplexities={selectedComplexities}
              onToggleComplexity={handleToggleComplexity}
            />
        </section>

        <section id="step2" className="mt-6 text-center">
          <button
            onClick={handleGenerateCode}
            disabled={isLoading || selectedComplexities.size !== REQUIRED_SELECTIONS}
            className="bg-purple-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none focus:outline-none focus:ring-4 focus:ring-purple-300 text-lg"
          >
            {isLoading ? 'Gerando Códigos...' : 'Passo 2: Gerar Códigos'}
          </button>
        </section>

        {error && (
            <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow" role="alert">
                <p className="font-bold">Ocorreu um erro</p>
                <p>{error}</p>
            </div>
        )}

        <section id="step3" className="mt-10">
            {isLoading && (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            )}

            {generatedCodes && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                 <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Passo 3: Seus Códigos Gerados</h2>
                    <p className="text-gray-600 mt-1">Clique em um item para expandir e ver os detalhes.</p>
                 </div>
                 <div>
                    {generatedCodes.map((code, index) => (
                      <GeneratedCodeItem
                        key={index}
                        code={code}
                        isOpen={openAccordionIndex === index}
                        onToggle={() => handleToggleAccordion(index)}
                      />
                    ))}
                 </div>
              </div>
            )}
        </section>

        {generatedCodes && (
            <section id="step4" className="mt-10">
                <GithubGuide />
            </section>
        )}
        
        <footer className="text-center mt-16 py-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
                Desenvolvido com React, Tailwind CSS e Gemini API.
            </p>
        </footer>

      </main>
    </div>
  );
};

export default App;