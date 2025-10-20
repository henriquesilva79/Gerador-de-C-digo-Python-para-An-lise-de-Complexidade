import React from 'react';
import { GeneratedCode } from '../types';
import CodeDisplay from './CodeDisplay';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface GeneratedCodeItemProps {
  code: GeneratedCode;
  isOpen: boolean;
  onToggle: () => void;
}

const GeneratedCodeItem: React.FC<GeneratedCodeItemProps> = ({ code, isOpen, onToggle }) => {
  const baseFilename = code.title.toLowerCase().replace(/\s+/g, '_');

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <h3 className="text-xl font-bold text-purple-700">{code.title}</h3>
          <p className="text-sm font-semibold text-gray-500 bg-purple-100 inline-block px-3 py-1 rounded-full mt-2 sm:mt-0">{`Complexidade: ${code.complexity}`}</p>
        </div>
        <ChevronDownIcon
          className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-6 bg-white">
          <p className="text-gray-700 mb-6 whitespace-pre-wrap leading-relaxed">{code.explanation}</p>
          <CodeDisplay title="Código Python" code={code.python_code} filename={`${baseFilename}.py`} />
          <CodeDisplay title="Testes (Pytest)" code={code.test_code} filename={`test_${baseFilename}.py`} />
          <CodeDisplay title="Documentação" code={code.documentation} filename="README.md" />
        </div>
      )}
    </div>
  );
};

export default GeneratedCodeItem;