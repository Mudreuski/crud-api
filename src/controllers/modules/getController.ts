import http from 'http';
import * as uuid from 'uuid';
import { userDB } from '../../../assets/user';
import { makeResponse } from '../../helpers';

export function getController(req: http.IncomingMessage, res: http.ServerResponse): void {
    const splitedUrl = (req.url as string).split('/');

    if (req.url === '/api/users') {
        makeResponse(res, 200, userDB)
    } else if (splitedUrl.length === 4) {
        if (uuid.validate(splitedUrl[3])) {
            getUserById(splitedUrl[3]);
        } else {
            makeResponse(res, 400, 'userId is invalid');
        }
    } else {
        makeResponse(res, 404, 'Api not found');
    }


    function getUserById(id: string): void {
        const user = userDB.find(user => user.id === id);

        if (user) {
            makeResponse(res, 200, user);
        } else {
            makeResponse(res, 404, 'User not found');
        }
    }
}
