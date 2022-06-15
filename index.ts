import * as http from 'http';
import 'dotenv/config';
import { applicationFactory } from './src/controllers';

const PORT: string|number = process.env.PORT || 3000;

const app: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    applicationFactory(req, res);
});

app.listen(PORT, (): void => {
    console.log(`Server running at http://localhost:${PORT}`);
});
