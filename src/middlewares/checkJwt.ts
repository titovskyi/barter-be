import { NextFunction, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const authToken: any = req.headers.authtoken;

    let jwtPayload;

    try {
        jwtPayload = jwt.verify(authToken, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send('Ошибка авторизации!');
        return;
    }

    next();

};
