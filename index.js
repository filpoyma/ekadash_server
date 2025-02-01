import app from './app.js';
import { dbConnect, serverListen } from './connections/connections.config.js';

serverListen(app);
dbConnect();
