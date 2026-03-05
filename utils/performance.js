import { performance } from 'perf_hooks';

let t0 = performance.now();
//....
logger.info(`performance: ${performance.now() - t0}`);
