import { Request, Response } from 'express';
import { verifyToken } from '../libs/jwt';
import { IMyRequest } from '../types';

export const teacherMiddleWare = (req: any, res: Response, next: () => void) => {
    const { token } = req.headers;
    if (!token) return res.status(404).send({ success: false, message: 'Token invalid' });
    verifyToken(token as string)
    .then(obj => {
        if (obj.authority === 1) {
            req.id = obj._id;
            next();
        }
    })
    .catch(err => res.status(404).send({ success: false, message: 'Token invalid' }));
};