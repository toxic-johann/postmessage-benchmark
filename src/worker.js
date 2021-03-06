import { squareMatrixMultiply } from './utils';
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
