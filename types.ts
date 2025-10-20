
export enum Complexity {
  O_1 = 'O(1)',
  O_LOG_N = 'O(log n)',
  O_N = 'O(n)',
  O_N_LOG_N = 'O(n log n)',
  O_N_2 = 'O(n^2)',
  O_2_N = 'O(2^n)',
}

export interface GeneratedCode {
  complexity: string;
  title: string;
  explanation: string;
  python_code: string;
  test_code: string;
  documentation: string;
}
