import { performance } from 'perf_hooks';

let t0 = performance.now();
//....
console.log('perfomance', performance.now() - t0);
