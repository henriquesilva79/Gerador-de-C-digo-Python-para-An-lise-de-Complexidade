import React, { useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';
import DownloadIcon from './icons/DownloadIcon';

interface CodeDisplayProps {
  title: string;
  code: string;
  filename: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ title, code, filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4 shadow-lg">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <p className="text-gray-300 text-sm font-mono">{title}</p>
        <div className="flex items-center space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200 text-xs"
              aria-label={`Download ${filename}`}
            >
              <DownloadIcon className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200 text-xs"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <ClipboardIcon className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>
        </div>
      </div>
      <pre className="p-4 text-sm text-gray-100 overflow-x-auto bg-gray-900">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
};

export default CodeDisplay;