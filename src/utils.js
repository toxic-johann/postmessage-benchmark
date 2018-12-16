export function squareMatrixMultiply(A, B) {
  const n = A.length;
  const C = [];
  for (let i = 0; i < n; i++) {
    C[i] = [];
    for (let j = 0; j < n; j++) {
      C[i][j] = 0;
      for (let k = 0; k < n; k++) {
        C[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return C;
}

export function createRandomMatrix(n) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(Math.random());
    }
    matrix.push(row);
  }
  return matrix;
}
