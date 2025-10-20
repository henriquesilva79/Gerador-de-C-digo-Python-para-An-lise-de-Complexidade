
import { Complexity } from './types';

export const AVAILABLE_COMPLEXITIES: { id: Complexity; name: string; description: string }[] = [
  { id: Complexity.O_1, name: 'O(1)', description: 'Tempo Constante' },
  { id: Complexity.O_LOG_N, name: 'O(log n)', description: 'Tempo Logarítmico' },
  { id: Complexity.O_N, name: 'O(n)', description: 'Tempo Linear' },
  { id: Complexity.O_N_LOG_N, name: 'O(n log n)', description: 'Tempo Log-Linear' },
  { id: Complexity.O_N_2, name: 'O(n^2)', description: 'Tempo Quadrático' },
  { id: Complexity.O_2_N, name: 'O(2^n)', description: 'Tempo Exponencial' },
];

export const REQUIRED_SELECTIONS = 3;
