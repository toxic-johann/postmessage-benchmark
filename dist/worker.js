(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function squareMatrixMultiply(A, B) {
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

  onmessage = function(event) {
    const {
      data: {
        data,
        id,
      },
    } = event;
    // this.console.warn(data);
    if (data.noRun) {
      return;
    }
    squareMatrixMultiply(data.a, data.b);
    postMessage({
      id,
      status: 1,
    });
  };

}));
