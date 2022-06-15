import http from 'http';
import { getData, isCorrectBody, makeResponse } from '../../helpers';
import { userDB } from '../../../assets/user';
import * as uuid from 'uuid';

export async function postController(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    if (req.url !== '/api/users') {
        makeResponse(res, 404, 'Api not found');
        return;
    }
    const body = await getData(req);

    if (isCorrectBody(body)){
        userDB.push({...body, id: uuid.v4()});
        makeResponse(res, 201, userDB[userDB.length - 1]);
    } else {
        makeResponse(res, 400, 'Input data is invalid');
    }
}
