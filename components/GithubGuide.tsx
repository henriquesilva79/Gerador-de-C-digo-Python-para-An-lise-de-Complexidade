
import React from 'react';
import CodeDisplay from './CodeDisplay';

const GithubGuide: React.FC = () => {

  const gitCommands = `
# 1. Navegue até a pasta do seu projeto
cd sua-pasta-do-projeto

# 2. Inicie um repositório Git
git init

# 3. Adicione os arquivos gerados
git add .

# 4. Faça o commit inicial
git commit -m "Adiciona algoritmos e testes iniciais"

# 5. Adicione o repositório remoto do GitHub
# (substitua a URL pela URL do seu repositório criado no GitHub)
git remote add origin https://github.com/seu-usuario/seu-repositorio.git

# 6. Envie o código para o GitHub
git push -u origin main
  `.trim();

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Passo 4: Subir no GitHub</h2>
      <p className="text-gray-600 mb-4">
        Siga estes passos para criar um repositório no GitHub e enviar seus códigos.
      </p>
      <ol className="list-decimal list-inside space-y-3 text-gray-700">
        <li>
          <strong>Crie um novo repositório no GitHub:</strong> Vá para <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium">github.com/new</a>, dê um nome ao seu repositório e clique em "Create repository".
        </li>
        <li>
          <strong>Salve os arquivos localmente:</strong> Crie uma pasta no seu computador. Para cada algoritmo, salve o código Python (ex: <code>soma_lista.py</code>), o código de teste (ex: <code>test_soma_lista.py</code>) e a documentação (<code>README.md</code>) em arquivos separados dentro desta pasta.
        </li>
        <li>
          <strong>Execute os comandos Git:</strong> Abra o terminal na pasta que você criou e execute os seguintes comandos para enviar seus arquivos.
        </li>
      </ol>
      <CodeDisplay title="Comandos Git" code={gitCommands} />
       <p className="text-gray-600 mt-4">
        Após executar estes comandos, seus arquivos estarão no GitHub. Copie a URL do seu repositório (ex: <code>https://github.com/seu-usuario/seu-repositorio</code>) e envie no SAVA.
      </p>
    </div>
  );
};

export default GithubGuide;
