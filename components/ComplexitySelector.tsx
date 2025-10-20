
import React from 'react';
import { AVAILABLE_COMPLEXITIES, REQUIRED_SELECTIONS } from '../constants';
import { Complexity } from '../types';

interface ComplexitySelectorProps {
  selectedComplexities: Set<Complexity>;
  onToggleComplexity: (complexity: Complexity) => void;
}

const ComplexitySelector: React.FC<ComplexitySelectorProps> = ({ selectedComplexities, onToggleComplexity }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Passo 1: Escolha as Complexidades</h2>
      <p className="text-gray-600 mb-4">Selecione {REQUIRED_SELECTIONS} tipos de complexidade para gerar os exemplos de código.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {AVAILABLE_COMPLEXITIES.map((comp) => {
          const isSelected = selectedComplexities.has(comp.id);
          return (
            <button
              key={comp.id}
              onClick={() => onToggleComplexity(comp.id)}
              className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-700 shadow-lg'
                  : 'bg-white hover:bg-purple-50 hover:border-purple-400 border-gray-200'
              }`}
            >
              <p className="font-bold text-lg">{comp.name}</p>
              <p className={`text-sm ${isSelected ? 'text-purple-200' : 'text-gray-500'}`}>{comp.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ComplexitySelector;
