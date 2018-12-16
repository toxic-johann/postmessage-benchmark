
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
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

  function createRandomMatrix(n) {
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

  const { Benchmark } = window;

  const suite = new Benchmark.Suite();

  const worker = new Worker('worker.js');

  const promiseMap = {};
  let id = 0;

  worker.onmessage = function(event) {
    const {
      data: {
        id,
      },
    } = event;
    promiseMap[id].resolveFn();
  };

  function sendMessage(data) {
    const currentId = ++id;
    let resolveFn;
    promiseMap[currentId] = {
      promise: new Promise(resolve => {
        resolveFn = resolve;
      }),
      resolveFn,
    };
    worker.postMessage({
      id: currentId,
      data,
    });
    return promiseMap[currentId].promise;
  }

  function fakeSendMessage(data) {
    const currentId = ++id;
    let resolveFn;
    promiseMap[currentId] = {
      promise: new Promise(resolve => {
        squareMatrixMultiply(data.a, data.b);
        resolveFn = resolve;
        resolve();
      }),
      resolveFn,
    };
    return promiseMap[currentId].promise;
  }

  function fakeSendMessageWithCopy(data) {
    const currentId = ++id;
    let resolveFn;
    promiseMap[currentId] = {
      promise: new Promise(resolve => {
        JSON.parse(JSON.stringify(data));
        squareMatrixMultiply(data.a, data.b);
        resolveFn = resolve;
        resolve();
      }),
      resolveFn,
    };
    return promiseMap[currentId].promise;
  }

  const matrix4d = createRandomMatrix(4);
  const matrix40d = createRandomMatrix(40);
  const matrix400d = createRandomMatrix(400);
  const matrix4000d = createRandomMatrix(4000);

  // add tests
  suite
    .add('mainthread calculation with 4 dimension', function() {
      const data = {
        a: matrix4d,
        b: matrix4d,
      };
      squareMatrixMultiply(data.a, data.b);
    })
    .add('fake message with 4 dimension', {
      defer: true,
      fn(deferred) {
        const promise = fakeSendMessage({
          a: matrix4d,
          b: matrix4d,
        });
        promise.then(() => {
          deferred.resolve();
        });
      },
    })
    .add('fake message and copy with 4 dimension', {
      defer: true,
      fn(deferred) {
        const promise = fakeSendMessageWithCopy({
          a: matrix4d,
          b: matrix4d,
        });
        promise.then(() => {
          deferred.resolve();
        });
      },
    })
    .add('worker calculation with 4 dimension', {
      defer: true,
      fn(deferred) {
        const promise = sendMessage({
          a: matrix4d,
          b: matrix4d,
        });
        promise.then(() => {
          deferred.resolve();
        });
      },
    })
    .add('mainthread calculation with 40 dimension', function() {
      const data = {
        a: matrix40d,
        b: matrix40d,
      };
      squareMatrixMultiply(data.a, data.b);
    })
    .add('fake message with 40 dimension', {
      defer: true,
      fn(deferred) {
        const promise = fakeSendMessage({
          a: matrix40d,
          b: matrix40d,
        });
        promise.then(() => {
          deferred.resolve();
        });
      },
    })
    .add('fake message and copy with 40 dimension', {
      defer: true,
      fn(deferred) {
        const promise = fakeSendMessageWithCopy({
          a: matrix40d,
          b: matrix40d,
        });
        promise.then(() => {
          deferred.resolve();
        });
      },
    })
    .add('worker calculation with 40 dimension', {
      defer: true,
      fn(deferred) {
        const promise = sendMessage({
          a: matrix40d,
          b: matrix40d,
        });
        promise.then(() => {
          deferred.resolve();
        });
      },
    })
    .add('mainthread calculation with 400 dimension', function() {
      const data = {
        a: matrix400d,
        b: matrix400d,
      };
      squareMatrixMultiply(data.a, data.b);
    })
    .add('fake message with 400 dimension', {
      defer: true,
      fn(deferred) {
        const promise = fakeSendMessage({
          a: matrix400d,
          b: matrix400d,
        });
        promise.then(() => {
          deferred.resolve();
        });
      },
    })
    .add('fake message and copy with 400 dimension', {
      defer: true,
      fn(deferred) {
        const promise = fakeSendMessageWithCopy({
          a: matrix400d,
          b: matrix400d,
        });
        promise.then(() => {
          deferred.resolve();
        });
      },
    })
    .add('worker calculation with 400 dimension', {
      defer: true,
      fn(deferred) {
        const promise = sendMessage({
          a: matrix400d,
          b: matrix400d,
        });
        promise.then(() => {
          deferred.resolve();
        });
      },
    })
    .add('postmessage test with 4 dimension', function() {
      const data = {
        noRun: true,
        data: matrix4d,
      };
      worker.postMessage({ data });
    })
    .add('postmessage test with 40 dimension', function() {
      const data = {
        noRun: true,
        data: matrix40d,
      };
      worker.postMessage({ data });
    })
    .add('postmessage test with 400 dimension', function() {
      const data = {
        noRun: true,
        data: matrix400d,
      };
      worker.postMessage({ data });
    })
    .add('postmessage test with 4000 dimension', function() {
      const data = {
        noRun: true,
        data: matrix4000d,
      };
      worker.postMessage({ data });
    })
  // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
  // run async
    .run({ async: true });

}));
