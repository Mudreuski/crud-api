import http from 'http';
import { getData, isCorrectBody, makeResponse } from '../../helpers';
import * as uuid from 'uuid';
import { userDB } from '../../../assets/user';
import { User } from '../../types';

export async function putController(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const splitedUrl = (req.url as string).split('/');

    if (splitedUrl.length === 4) {
        if (uuid.validate(splitedUrl[3])) {
            const body = await getData(req);

            if (isCorrectBody(body)) {
                updateUser(body,splitedUrl[3]);
            } else {
                makeResponse(res, 400, 'Input data is invalid');
            }
        } else {
            makeResponse(res, 400, 'userId is invalid');
        }
    } else {
        makeResponse(res, 404, 'Api not found');
    }

    function updateUser(body: User, id: string): void {
        const userIndex = userDB.findIndex(user => user.id === id);

        if (userIndex !== -1) {
            userDB[userIndex] = { id: userDB[userIndex].id, ...body };
            makeResponse(res, 200, userDB[userIndex]);
        } else {
            makeResponse(res, 404, 'User not found');
        }
    }
}
