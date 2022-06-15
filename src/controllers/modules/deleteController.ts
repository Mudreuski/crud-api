import http from 'http';
import * as uuid from 'uuid';
import { makeResponse } from '../../helpers';
import { userDB } from '../../../assets/user';

export function deleteController(req: http.IncomingMessage, res: http.ServerResponse): void {
    const splitedUrl = (req.url as string).split('/');

    if (splitedUrl.length === 4) {
        if (uuid.validate(splitedUrl[3])) {
            deleteUser(splitedUrl[3]);
        } else {
            makeResponse(res, 400, 'userId is invalid');
        }
    } else {
        makeResponse(res, 404, 'Api not found');
    }

    function deleteUser(id: string) {
        const userIndex = userDB.findIndex(user => user.id === id);

        if (userIndex !== -1) {
            userDB.splice(userIndex, 1);
            makeResponse(res, 204, '');
        } else {
            makeResponse(res, 404, 'User not found');
        }
    }
}
