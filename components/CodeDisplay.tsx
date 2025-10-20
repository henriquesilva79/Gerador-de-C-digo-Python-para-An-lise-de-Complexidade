
import React, { useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface CodeDisplayProps {
  title: string;
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ title, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700">
        <p className="text-gray-300 text-sm font-semibold">{title}</p>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 text-green-400" />
              <span className="text-xs">Copiado!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4" />
              <span className="text-xs">Copiar</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm text-white overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
