import http from 'http';
import { User } from '../types';

export function getData(req: http.IncomingMessage): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        try {
            let body: string = '';

            req.on('data', (chunk: Buffer) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(JSON.parse(body));
            });
        } catch (error) {
            reject(error);
        }
    });
}

export function isCorrectBody(body: User): boolean {
    const { username, age, hobbies } = body;
    const checkName = Boolean(username && typeof username === 'string');
    const checkAge = Boolean(age && typeof age === 'number');
    const checkHobbies = Boolean(Array.isArray(hobbies) && hobbies.every(hobby => typeof hobby === 'string'));

    return checkName && checkAge && checkHobbies;
}

export function makeResponse(res: http.ServerResponse, status: number, response: any, headers: any = { 'Content-Type': 'application/json' }): void {
    res.writeHead(status, headers);
    res.end(JSON.stringify(response));
}
