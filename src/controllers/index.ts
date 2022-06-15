import * as http from 'http';
import { getController } from './modules/getController';
import { postController } from './modules/postController';
import { putController } from './modules/putController';
import { deleteController } from './modules/deleteController';
import { makeResponse } from '../helpers';

export async function applicationFactory(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    if (!req.url?.startsWith('/api/users')) {
        makeResponse(res, 404,'Api not found');
        return;
    }

    try {
        switch (req.method) {
            case 'GET':
                getController(req, res);
                break;
            case 'POST':
                await postController(req, res);
                break;
            case 'PUT':
                await putController(req, res);
                break;
            case 'DELETE':
                deleteController(req, res);
                break;
            default:
                makeResponse(res, 404,'Method not found');
        }
    } catch (e) {
        makeResponse(res, 500, 'Server error');
    }
}
